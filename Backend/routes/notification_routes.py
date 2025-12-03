from flask import Blueprint, jsonify
from models.notification import Notification

notification_bp = Blueprint("notification_bp", __name__)

@notification_bp.get("/")
def all_notifications():
    try:
        # No JWT, so just return all notifications
        notifications = Notification.query.all()

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
