from flask import Blueprint, request, jsonify
from models.subscription import Subscription
from models import db

subscription_bp = Blueprint("subscription_bp", __name__)

# -----------------------------
# GET all subscriptions for a user (user_id passed as query param)
# -----------------------------
@subscription_bp.get("/")
def get_subscriptions():
    try:
        user_id = request.args.get("user_id", type=int)

        if user_id is None:
            return jsonify({"error": "user_id query parameter is required"}), 400

        subscriptions = Subscription.query.filter_by(user_id=user_id).all()
        return jsonify([sub.to_dict() for sub in subscriptions]), 200
    except Exception as e:
        print("Error fetching subscriptions:", e)
        return jsonify({"error": "Failed to fetch subscriptions"}), 500

# -----------------------------
# CREATE a new subscription
# -----------------------------
@subscription_bp.post("/")
def create_subscription():
    try:
        data = request.json

        if not data or "user_id" not in data or "plan" not in data or "price" not in data:
            return jsonify({"error": "user_id, plan, and price are required"}), 400

        new_sub = Subscription(
            user_id=data["user_id"],
            plan=data["plan"],
            price=float(data["price"])
        )

        db.session.add(new_sub)
        db.session.commit()

        return jsonify(new_sub.to_dict()), 201
    except Exception as e:
        print("Error creating subscription:", e)
        return jsonify({"error": "Failed to create subscription"}), 500

# -----------------------------
# DELETE a subscription by id
# -----------------------------
@subscription_bp.delete("/<int:sub_id>")
def delete_subscription(sub_id):
    try:
        user_id = request.args.get("user_id", type=int)

        if not user_id:
            return jsonify({"error": "user_id query parameter is required"}), 400

        sub = Subscription.query.filter_by(id=sub_id, user_id=user_id).first()
        if not sub:
            return jsonify({"error": "Subscription not found"}), 404

        db.session.delete(sub)
        db.session.commit()
        return jsonify({"message": "Subscription deleted"}), 200
    except Exception as e:
        print("Error deleting subscription:", e)
        return jsonify({"error": "Failed to delete subscription"}), 500
