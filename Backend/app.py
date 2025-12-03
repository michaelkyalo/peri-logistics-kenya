import os
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from models import db
from config import Config

# ROUTES
from routes.auth_routes import auth_bp
from routes.truck_routes import truck_bp
from routes.request_routes import request_bp
from routes.notification_routes import notification_bp
from routes.subscription_routes import subscription_bp
from routes.packaging_routes import packaging_bp

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    # Ensure instance folder exists
    os.makedirs(app.instance_path, exist_ok=True)

    # Load default config
    app.config.from_object(Config)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Use DATABASE_URL from environment if available (Supabase Postgres)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        "DATABASE_URL",
        f"sqlite:///{os.path.join(app.instance_path, 'peri_logistics.db')}"
    )

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    # Configure CORS for your React frontend
    CORS(
        app,
        origins=[
            "http://localhost:5173",                # local dev
            "https://your-frontend.vercel.app"     # deployed frontend
        ],
        supports_credentials=True,
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"]
    )

    # REGISTER BLUEPRINTS
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(truck_bp, url_prefix="/api/trucks")
    app.register_blueprint(request_bp, url_prefix="/api/requests")
    app.register_blueprint(notification_bp, url_prefix="/api/notifications")
    app.register_blueprint(subscription_bp, url_prefix="/api/subscriptions")
    app.register_blueprint(packaging_bp, url_prefix="/api/packaging")

    # Simple health check
    @app.route("/")
    def home():
        return {"status": "backend running"}, 200

    # Handle OPTIONS preflight globally
    @app.before_request
    def before_request_func():
        from flask import request
        if request.method == "OPTIONS":
            return {}, 200

    return app


if __name__ == "__main__":
    # Port 5000 for local testing; Vercel will override
    app = create_app()
    app.run(debug=True, port=5000)
