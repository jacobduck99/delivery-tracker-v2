
from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from sqlite3 import IntegrityError
import traceback

from data.database import get_db

stats_bp = Blueprint("stats", __name__)

@stats_bp.get("/stats/<int:run_id>")
def get_stats(run_id):
    pass
