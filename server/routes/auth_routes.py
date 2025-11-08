# routes/auth_routes.py

from flask import Blueprint, request, jsonify
from sqlite3 import IntegrityError
import traceback

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/auth")
def 
