from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.notification import Notification

notification_bp = Blueprint("notification_bp", __name__)

@notification_bp.get("/")
@jwt_required()
def all_notifications():
    try:
        user_id = get_jwt_identity()  # JWT identity gives user ID

        notifications = Notification.query.filter_by(user_id=user_id).all()

        notifications_list = [
            {
                "id": n.id,
                "message": n.message,
                "read": n.read,
                "created_at": n.created_at.isoformat() if hasattr(n, "created_at") else None
            }
            for n in notifications
        ]

        return jsonify({"notifications": notifications_list}), 200
    except Exception as e:
        print("Error fetching notifications:", e)
        return jsonify({"error": "Failed to fetch notifications"}), 500
