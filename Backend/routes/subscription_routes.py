from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.subscription import Subscription
from models import db

subscription_bp = Blueprint("subscription_bp", __name__)

# -----------------------------
# GET all subscriptions for logged-in user
# -----------------------------
@subscription_bp.get("/")
@jwt_required()
def get_subscriptions():
    try:
        identity = get_jwt_identity()
        user_id = identity if isinstance(identity, int) else identity.get("id")

        subscriptions = Subscription.query.filter_by(user_id=user_id).all()
        return jsonify([sub.to_dict() for sub in subscriptions]), 200
    except Exception as e:
        print("Error fetching subscriptions:", e)
        return jsonify({"error": "Failed to fetch subscriptions"}), 500

# -----------------------------
# CREATE a new subscription
# -----------------------------
@subscription_bp.post("/")
@jwt_required()
def create_subscription():
    try:
        data = request.json
        identity = get_jwt_identity()
        user_id = identity if isinstance(identity, int) else identity.get("id")

        if not data or "plan" not in data or "price" not in data:
            return jsonify({"error": "Plan and price are required"}), 400

        new_sub = Subscription(
            user_id=user_id,
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
@jwt_required()
def delete_subscription(sub_id):
    try:
        identity = get_jwt_identity()
        user_id = identity if isinstance(identity, int) else identity.get("id")

        sub = Subscription.query.filter_by(id=sub_id, user_id=user_id).first()
        if not sub:
            return jsonify({"error": "Subscription not found"}), 404

        db.session.delete(sub)
        db.session.commit()
        return jsonify({"message": "Subscription deleted"}), 200
    except Exception as e:
        print("Error deleting subscription:", e)
        return jsonify({"error": "Failed to delete subscription"}), 500
