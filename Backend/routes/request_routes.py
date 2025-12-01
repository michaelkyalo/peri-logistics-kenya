from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.request import Request
from models import db

request_bp = Blueprint("request_bp", __name__)

# -----------------------------
# GET all requests for logged-in user
# -----------------------------
@request_bp.get("/")
@jwt_required()
def all_requests():
    try:
        identity = get_jwt_identity()
        user_id = identity if isinstance(identity, int) else identity.get("id")

        requests = Request.query.filter_by(customer_id=user_id).all()
        return jsonify([req.to_dict() for req in requests]), 200
    except Exception as e:
        print("Error fetching requests:", e)
        return jsonify({"error": "Failed to fetch requests"}), 500

# -----------------------------
# CREATE a new request
# -----------------------------
@request_bp.post("/")
@jwt_required()
def create_request():
    try:
        data = request.json
        identity = get_jwt_identity()
        user_id = identity if isinstance(identity, int) else identity.get("id")

        required_fields = ["goods", "weight_kg", "pickup_location", "dropoff_location"]
        if not data or not all(field in data for field in required_fields):
            return jsonify({"error": f"Fields {required_fields} are required"}), 400

        new_request = Request(
            customer_id=user_id,
            driver_id=data.get("driver_id"),
            truck_id=data.get("truck_id"),
            goods=data["goods"],
            weight_kg=data["weight_kg"],
            pickup_location=data["pickup_location"],
            dropoff_location=data["dropoff_location"],
            status=data.get("status", "pending")
        )

        db.session.add(new_request)
        db.session.commit()

        return jsonify(new_request.to_dict()), 201
    except Exception as e:
        print("Error creating request:", e)
        return jsonify({"error": "Failed to create request"}), 500

# -----------------------------
# UPDATE a request status (e.g., by driver/admin)
# -----------------------------
@request_bp.put("/<int:req_id>")
@jwt_required()
def update_request(req_id):
    try:
        data = request.json
        req = Request.query.get(req_id)
        if not req:
            return jsonify({"error": "Request not found"}), 404

        # Only allow updating status, truck, or driver assignment
        if "status" in data:
            req.status = data["status"]
        if "driver_id" in data:
            req.driver_id = data["driver_id"]
        if "truck_id" in data:
            req.truck_id = data["truck_id"]

        db.session.commit()
        return jsonify(req.to_dict()), 200
    except Exception as e:
        print("Error updating request:", e)
        return jsonify({"error": "Failed to update request"}), 500

# -----------------------------
# DELETE a request
# -----------------------------
@request_bp.delete("/<int:req_id>")
@jwt_required()
def delete_request(req_id):
    try:
        req = Request.query.get(req_id)
        if not req:
            return jsonify({"error": "Request not found"}), 404

        db.session.delete(req)
        db.session.commit()
        return jsonify({"message": "Request deleted"}), 200
    except Exception as e:
        print("Error deleting request:", e)
        return jsonify({"error": "Failed to delete request"}), 500
