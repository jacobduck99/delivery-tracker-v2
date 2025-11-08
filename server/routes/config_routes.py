from flask import Blueprint, request, jsonify

config_bp = Blueprint("config", __name__)

@config_bp.post("/config")
