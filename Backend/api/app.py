from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.notification_routes import notification_bp
from routes.packaging_routes import packaging_bp
from routes.request_routes import request_bp
from routes.subscription_routes import subscription_bp
from routes.truck_routes import truck_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/api/*": {"origins": "*"}})  # explicit for production
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(truck_bp, url_prefix="/api/trucks")           # plural
app.register_blueprint(request_bp, url_prefix="/api/requests")
app.register_blueprint(notification_bp, url_prefix="/api/notifications")
app.register_blueprint(subscription_bp, url_prefix="/api/subscriptions")
app.register_blueprint(packaging_bp, url_prefix="/api/packaging")
