from flask import Blueprint, request, jsonify
from models import db
from models.packaging import Packaging

packaging_bp = Blueprint("packaging_bp", __name__, url_prefix="/api/packaging")

@packaging_bp.post("/")
def create_packaging_request():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Extract fields
        item_type = data.get("item_type")
        weight_kg = data.get("weight_kg")
        packaging_type = data.get("packaging_type")
        notes = data.get("notes", "")

        # Validate required fields
        if not all([item_type, weight_kg, packaging_type]):
            return jsonify({"error": "Missing required fields"}), 400

        # Ensure weight is a float
        try:
            weight_kg = float(weight_kg)
        except ValueError:
            return jsonify({"error": "Weight must be a number"}), 400

        # Create and save package
        new_package = Packaging(
            item_type=item_type,
            weight_kg=weight_kg,
            packaging_type=packaging_type,
            notes=notes
        )

        db.session.add(new_package)
        db.session.commit()

        return jsonify({"message": "Packaging request created successfully"}), 201

    except Exception as e:
        # Print full traceback to console for debugging
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Failed to create packaging request", "details": str(e)}), 500
