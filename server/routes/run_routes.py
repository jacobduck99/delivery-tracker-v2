
from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from sqlite3 import IntegrityError
import traceback

from data.database import get_db

run_bp = Blueprint("run", __name__)

@run_bp.get("/run")
def run():
    pass

