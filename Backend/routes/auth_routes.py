from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token
from models.user import User, Role
from models import db

auth_bp = Blueprint("auth_bp", __name__)

# -----------------------------
# REGISTER a new user
# -----------------------------
@auth_bp.post("/register")
def register():
    data = request.json

    # Validate required fields
    if not data or not all(k in data for k in ("full_name", "email", "password")):
        return jsonify({"error": "full_name, email, and password are required"}), 400

    email = data["email"]

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    # Assign role (default "customer")
    role_value = data.get("role", "customer")
    if role_value not in Role._value2member_map_:
        return jsonify({"error": f"Invalid role '{role_value}'"}), 400

    user = User(
        full_name=data["full_name"],
        email=email,
        role=Role(role_value)
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Registered successfully"}), 201


# -----------------------------
# LOGIN existing user
# -----------------------------
@auth_bp.post("/login")
def login():
    data = request.json

    if not data or not all(k in data for k in ("email", "password")):
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Use only user.id as JWT identity
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify({
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role.value
        }
    }), 200
