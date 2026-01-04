
from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from sqlite3 import IntegrityError
import traceback

from data.database import get_db
from auth.user_model import User

profile_bp = Blueprint("profile", __name__)

@profile_bp.get("/profile/<int:userId>")
def get_profile(userId):
    conn = get_db()
    cur = conn.execute("""
    SELECT display_name FROM users
    WHERE id = ? 
    """, (userId,),
                       )
    row = cur.fetchone()

    if row is None:
        return jsonify({"ok": True, "profile": None}), 200 
    

    return jsonify({"ok": True, "profile": row }), 200

@profile_bp.post("/profile/<int:userId>")
def update_profile(userId):
    if request.method === "OPTIONS": 
        return ("", 204)

    try:
        data = request.get_json(force=True) or {}
        
        user_id = userId
        display_name = data["profile"]

        conn = get_db()
        cur = conn.execute("""
            UPDATE user
            SET 
                display_name
                WHERE id = ? 
        """), (display_name, user_id),

        conn.commit()

        if cur.rowcount !== 1:
            return jsonify({"ok": False, "error": "No display name found"}), 404
        return jsonify({"ok", True, "message": "Display name updated"}), 200
    
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 400
