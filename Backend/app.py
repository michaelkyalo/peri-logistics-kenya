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
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)
    # JWTManager(app)  <-- removed

    # Configure CORS to allow your React frontend
    CORS(
        app,
        origins=["http://localhost:5173"],  # React dev server
        supports_credentials=True,          # allow cookies in requests
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

    # Optional: Handle OPTIONS preflight globally
    @app.before_request
    def before_request_func():
        from flask import request
        if request.method == "OPTIONS":
            return {}, 200

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
