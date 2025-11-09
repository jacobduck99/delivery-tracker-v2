# routes/auth_routes.py

from flask import Blueprint, request, jsonify
from sqlite3 import IntegrityError
import traceback
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.post("/login")
def login():
    pass

@auth_bp.post("/signup")
def signup():
    if not request.is_json:
        return jsonify({"ok": False, "error": "Expected JSON"}), 400

    data = request.get_json();

    username = data.get("username");
    password = data.get("password");
