from flask import Blueprint, request, jsonify
from models.request import Request
from models import db

request_bp = Blueprint("request_bp", __name__)

# Fixed rate per kg (adjust as needed)
PRICE_PER_KG = 50  # Example: 50 currency units per kg

# -----------------------------
# GET all requests for a user (user_id passed as query param)
# -----------------------------
@request_bp.get("/")
def all_requests():
    try:
        user_id = request.args.get("user_id", type=int)

        if user_id is None:
            return jsonify({"error": "user_id query parameter is required"}), 400

        requests = Request.query.filter_by(customer_id=user_id).all()

        requests_list = []
        for req in requests:
            req_dict = req.to_dict()
            # Add estimated price
            req_dict["estimated_price"] = req.weight_kg * PRICE_PER_KG
            requests_list.append(req_dict)

        return jsonify(requests_list), 200
    except Exception as e:
        print("Error fetching requests:", e)
        return jsonify({"error": "Failed to fetch requests"}), 500

# -----------------------------
# CREATE a new request
# -----------------------------
@request_bp.post("/")
def create_request():
    try:
        data = request.json
        user_id = data.get("customer_id")

        if not user_id:
            return jsonify({"error": "customer_id is required"}), 400

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

        # Add estimated price in response
        response_data = new_request.to_dict()
        response_data["estimated_price"] = new_request.weight_kg * PRICE_PER_KG

        return jsonify(response_data), 201
    except Exception as e:
        print("Error creating request:", e)
        return jsonify({"error": "Failed to create request"}), 500

# -----------------------------
# UPDATE a request
# -----------------------------
@request_bp.put("/<int:req_id>")
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

        # Include estimated price in response
        req_dict = req.to_dict()
        req_dict["estimated_price"] = req.weight_kg * PRICE_PER_KG

        return jsonify(req_dict), 200
    except Exception as e:
        print("Error updating request:", e)
        return jsonify({"error": "Failed to update request"}), 500

# -----------------------------
# DELETE a request
# -----------------------------
@request_bp.delete("/<int:req_id>")
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
