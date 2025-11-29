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

        user_id = int(data["user_id"]) 
        van_number = int(data["van_number"])
        van_name = data["van_name"].strip()
        start_time = to_utc_iso(data["start_time"])  # ensure this handles "HH:MM"
        number_of_drops = int(data["number_of_drops"])
        if not van_name:
            raise KeyError("van_name empty")

        first_break  =  to_utc_iso(data.get("first_break"))
        second_break =  to_utc_iso(data.get("second_break"))
        end_time     =  to_utc_iso(data.get("end_time"))
        truck_damage = (data.get("truck_damage") or "").strip() or None

        conn = get_db() 
        cur = conn.execute(
            """
            INSERT INTO config
              (user_id, van_number, van_name, start_time, first_break, second_break,
               end_time, number_of_drops, truck_damage)
            VALUES (?,?,?,?,?,?,?,?,?)
            """,
            (user_id, van_number, van_name, start_time, first_break, second_break,
             end_time, number_of_drops, truck_damage),
        )

        run_id = cur.lastrowid

        for idx in range(1, number_of_drops +1):
            conn.execute(
                """
                INSERT INTO deliveries (run_id, drop_idx, address, start_ts, end_ts, elapsed, expected_minutes, status)
                VALUES (?,?,?,?,?,?,?,?)
                """, 
                (run_id, idx, None, None, None, 0, None, "Not-started"),)
 
        conn.commit()
       
        return jsonify({"ok": True, "number_of_drops": number_of_drops}), 201


    except IntegrityError as e:
        return jsonify({"ok": False, "error": f"db integrity: {e}"}), 400
    except Exception as e:
        traceback.print_exc()  # <-- see exact cause in Flask console
        return jsonify({"ok": False, "error": str(e)}), 500

@config_bp.get("/config")
def list_configs():
    rows = get_db().execute("SELECT * FROM config").fetchall()
    return jsonify([dict(row) for row in rows])
