# routes/auth_routes.py
# routes/auth_routes.py
from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from sqlite3 import IntegrityError
import traceback

from data.database import get_db
from auth.user_model import User

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.post("/signup")
def signup():
    if not request.is_json:
        return jsonify({"ok": False, "error": "Expected JSON"}), 400

    data = request.get_json()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"ok": False, "error": "email and password required"}), 400

    conn = get_db()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            (email, generate_password_hash(password)),
        )
        conn.commit()

        user_id = cur.lastrowid
        row = conn.execute(
            "SELECT id, email FROM users WHERE id = ?",
            (user_id,),
        ).fetchone()

        user = User(row["id"], row["email"])
        # auto-login after signup (optional)
        login_user(user, remember=True)
        session.permanent = True

        return jsonify({"ok": True, "user": {"id": row["id"], "email": row["email"]}}), 201

    except IntegrityError:
        return jsonify({"ok": False, "error": "email already exists"}), 409
    except Exception as e:
        traceback.print_exc()
        return jsonify({"ok": False, "error": str(e)}), 500

@auth_bp.post("/login")
def login():
    if not request.is_json:
        return jsonify({"ok": False, "error": "Expected JSON"}), 400

    data = request.get_json()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"ok": False, "error": "email and password required"}), 400

    row = get_db().execute(
        "SELECT id, email, password_hash FROM users WHERE email = ?",
        (email,),
    ).fetchone()

    # generic error avoids user enumeration
    if not row or not check_password_hash(row["password_hash"], password):
        return jsonify({"ok": False, "error": "invalid credentials"}), 401

    user = User(row["id"], row["email"])
    login_user(user, remember=True)
    session.permanent = True

    return jsonify({"ok": True, "user": {"id": row["id"], "email": row["email"]}}), 200

@auth_bp.post("/logout")
@login_required
def logout():
    logout_user()
    return jsonify({"ok": True}), 200

@auth_bp.get("/me")
def me():
    if current_user.is_authenticated:
        return jsonify({"ok": True, "user": {"id": current_user.id, "email": current_user.email}})
    return jsonify({"ok": False, "user": None}), 200
