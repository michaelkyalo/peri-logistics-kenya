from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models.packaging import Packaging

packaging_bp = Blueprint("packaging_bp", __name__)

@packaging_bp.get("/")
@jwt_required()
def all_packaging():
    try:
        packages = Packaging.query.all()

        packages_list = [
            {
                "id": p.id,
                "type": p.type,
                "description": p.description
            }
            for p in packages
        ]

        return jsonify({"packaging": packages_list}), 200
    except Exception as e:
        print("Error fetching packaging:", e)
        return jsonify({"error": "Failed to fetch packaging"}), 500
