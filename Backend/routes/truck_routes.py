from flask import Blueprint, request, jsonify
from models.truck import Truck, TruckStatus
from models import db

truck_bp = Blueprint("truck_bp", __name__, url_prefix="/api/trucks")

# GET all trucks
@truck_bp.get("/")
def all_trucks():
    try:
        trucks = Truck.query.all()
        return jsonify([t.to_dict() for t in trucks]), 200
    except Exception as e:
        print("Error fetching trucks:", e)
        return jsonify({"error": "Failed to fetch trucks"}), 500

# POST a new truck
@truck_bp.post("/")
def add_truck():
    try:
        data = request.get_json()
        plate = data.get("plate")
        capacity = data.get("capacity_kg")
        refrigerated = data.get("refrigerated", True)

        if not plate or capacity is None:
            return jsonify({"error": "Plate number and capacity are required"}), 400

        new_truck = Truck(
            plate_number=plate,
            capacity_kg=capacity,
            refrigerated=refrigerated,
            status=TruckStatus.AVAILABLE
        )

        db.session.add(new_truck)
        db.session.commit()

        return jsonify(new_truck.to_dict()), 201

    except Exception as e:
        print("Error adding truck:", e)
        return jsonify({"error": "Failed to add truck"}), 500

# DELETE a truck by id
@truck_bp.delete("/<int:id>/")
def delete_truck(id):
    try:
        truck = Truck.query.get(id)
        if not truck:
            return jsonify({"error": "Truck not found"}), 404

        db.session.delete(truck)
        db.session.commit()
        return jsonify({"message": "Truck deleted"}), 200

    except Exception as e:
        print("Error deleting truck:", e)
        return jsonify({"error": "Failed to delete truck"}), 500

