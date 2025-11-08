# routes/config_routes.py
from flask import Blueprint, request, jsonify
from sqlite3 import IntegrityError
import traceback
from utils.time_helpers import to_utc_iso
from data.database import get_db


config_bp = Blueprint("config", __name__)

@config_bp.post("/config")
def save_config():
    if request.method == "OPTIONS":
        return ("", 204)

    try:
        data = request.get_json(force=True) or {}

        # ---- your existing validation ----
        van_number = int(data["vanNumber"])
        van_name = data["vanName"].strip()
        start_time = to_utc_iso(data["shiftStart"])  # ensure this handles "HH:MM"
        number_of_drops = int(data["numberOfDeliveries"])
        if not van_name:
            raise KeyError("vanName empty")

        first_break  =  to_utc_iso(data.get("firstBreak"))
        second_break =  to_utc_iso(data.get("secondBreak"))
        end_time     =  to_utc_iso(data.get("shiftEnd"))
        truck_damage = (data.get("truckDamage") or "").strip() or None

        conn = get_db()
        conn.execute(
            """
            INSERT INTO config
              (van_number, van_name, start_time, first_break, second_break,
               end_time, number_of_drops, truck_damage)
            VALUES (?,?,?,?,?,?,?,?)
            """,
            (van_number, van_name, start_time, first_break, second_break,
             end_time, number_of_drops, truck_damage),
        )
        conn.commit()
        return jsonify({"ok": True}), 201

    except IntegrityError as e:
        return jsonify({"ok": False, "error": f"db integrity: {e}"}), 400
    except Exception as e:
        traceback.print_exc()  # <-- see exact cause in Flask console
        return jsonify({"ok": False, "error": str(e)}), 500
