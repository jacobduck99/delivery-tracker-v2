from flask import Blueprint, request, jsonify
from sqlite3 import IntegrityError
from flask_cors import cross_origin
from utils.time_helpers import to_utc_iso
from data.database import get_db

config_bp = Blueprint("config", __name__)

def opt_iso(s: str | None) -> str | None:
    if not s:
        return None
    return to_utc_iso(s)

@config_bp.route("/config", methods=["POST", "OPTIONS"])
@cross_origin(                     # allow preflight + POST from Vite dev server
    origins="http://localhost:5173",
    methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)
def save_config():
    # Handle the preflight quickly
    if request.method == "OPTIONS":
        return ("", 204)

    data = request.get_json(force=True) or {}

    try:
        van_number = int(data["vanNumber"])
        van_name = data["vanName"].strip()
        start_time = to_utc_iso(data["shiftStart"])
        number_of_drops = int(data["numberOfDeliveries"])
        if not van_name:
            raise KeyError("vanName empty")
    except (KeyError, ValueError) as e:
        return jsonify({"ok": False, "error": f"Invalid or missing field: {e}"}), 400

    first_break  = opt_iso(data.get("firstBreak"))
    second_break = opt_iso(data.get("secondBreak"))
    end_time     = opt_iso(data.get("shiftEnd"))
    truck_damage = (data.get("truckDamage") or "").strip() or None

    conn = get_db()
    try:
        conn.execute(
            """
            INSERT INTO config
              (van_number, van_name, start_time, first_break, second_break,
               end_time, actual_end_time_at, duration_ms, number_of_drops, truck_damage)
            VALUES (?,?,?,?,?,?,?,?,?,?)
            """,
            (
                van_number, van_name, start_time, first_break, second_break,
                end_time, None, None, number_of_drops, truck_damage
            ),
        )
        conn.commit()
    except IntegrityError as e:
        return jsonify({"ok": False, "error": str(e)}), 400

    return jsonify({"ok": True}), 201
