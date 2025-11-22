
from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from sqlite3 import IntegrityError
import traceback

from data.database import get_db

run_bp = Blueprint("run", __name__)

@run_bp.get("/run")
def run():
    if not request.is_json:
        return jsonify({"ok": False, "error": "Expected JSON"}), 400 
    
    if current_user.is_authenticated:
    
        result = get_db().execute(
            "SELECT number_of_drops FROM config"
        ).fetchone()
        
        if result is None:
            return jsonify({"error": "No config found"}), 400

        drops = result["number_of_drops"]
        return jsonify({"ok": True, "Drops": drops}), 200




