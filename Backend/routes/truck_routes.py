from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models.truck import Truck

truck_bp = Blueprint("truck_bp", __name__)

@truck_bp.get("/")
@jwt_required()
def all_trucks():
    try:
        trucks = Truck.query.all()

        trucks_list = [
            {
                "id": t.id,
                "name": t.name,
                "capacity": t.capacity,
                "status": t.status
            }
            for t in trucks
        ]

        return jsonify({"trucks": trucks_list}), 200
    except Exception as e:
        print("Error fetching trucks:", e)
        return jsonify({"error": "Failed to fetch trucks"}), 500

