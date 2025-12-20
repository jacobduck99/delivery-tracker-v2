from datetime import datetime, timezone
from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from sqlite3 import IntegrityError
import traceback

from data.database import get_db

stats_bp = Blueprint("stats", __name__)

@stats_bp.get("/stats/<int:run_id>")
def get_stats(run_id):
    conn = get_db() 
    cur = conn.execute(
        """
        SELECT
            drop_idx,
            address,
            start_ts,
            end_ts,
            elapsed,
            expected_minutes
        FROM deliveries
        WHERE run_id = ?
        ORDER BY drop_idx
        """,
        (run_id,),
    )
    rows = cur.fetchall()

    cur = conn.execute(
        """
        SELECT 
            van_number,
            van_name,
            start_time,
            end_time,
            actual_end_time,
            truck_damage
            FROM config
            WHERE id = ?
        """,
        (run_id,),
    )
    config_row = cur.fetchone()

    deliveries = [dict(row) for row in rows]

    van_number = config_row["van_number"]
    print("this is ur van_number", van_number)
    van_name = config_row["van_name"]
     
    start_time = datetime.fromisoformat(
        config_row["start_time"].replace("Z", "+00:00")
    )
    end_time = datetime.fromisoformat(
        config_row["end_time"].replace("Z", "+00:00")
    )

    shift_duration_seconds = (end_time - start_time).total_seconds()
    shift_duration_hours = shift_duration_seconds / 3600

    drops = len(deliveries)

    total_elapsed = 0
    for d in deliveries:
        if d["elapsed"]:
            total_elapsed += d["elapsed"]
 
    avg_drop_seconds = (total_elapsed / drops) / 1000 if drops else 0

    print("this is your average", avg_drop_seconds)

    stats = {
        "Drops": drops,
        "VanNumber": van_number,
        "VanName": van_name,
        "DurationHours": round(shift_duration_hours, 2),
        "AverageTimeSeconds": round(avg_drop_seconds, 1)
    }
    
    return jsonify({"ok": True, "data": stats}), 200

@stats_bp.get("/stats/previous/<int:userId>")
def get_previous_run(userId):
    conn = get_db()
    cur = conn.execute(
        """
        SELECT *
        FROM config
        WHERE user_id = ?
          AND end_time IS NOT NULL
        ORDER BY actual_end_time DESC
        LIMIT 1
        """,
        (userId,),
    )

    row = cur.fetchone()
    print("this is ur row", row)

    if row is None:
        return jsonify({"ok": True, "data": None}), 200

    return jsonify({"ok": True, "data": dict(row)}), 200


    
