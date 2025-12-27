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
    van_name = config_row["van_name"]

    truck_damage = config_row["truck_damage"]
     
    start_time = datetime.fromisoformat(
        config_row["start_time"].replace("Z", "+00:00")
    )

    end_time = datetime.fromisoformat(
        config_row["end_time"].replace("Z", "+00:00")
    ) 

    shift_duration_seconds = (end_time - start_time).total_seconds()
    shift_duration_hours = shift_duration_seconds / 3600

    drops = len(deliveries)

    completed_drops = 0
    total_elapsed = 0

    for drop in deliveries:
        elapsed = drop.get("elapsed")

        if elapsed is not None and elapsed > 0:
            completed_drops += 1
            total_elapsed += elapsed

    avg_drop_seconds = (
        (total_elapsed / completed_drops) / 1000
        if completed_drops > 0
        else 0
    )

    stats = {
        "Drops": drops,
        "VanNumber": van_number,
        "VanName": van_name,
        "StartTime": start_time,
        "TruckDamage": truck_damage,
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
        ORDER BY id DESC
        LIMIT 1
        """,
        (userId,),
    )

    row = cur.fetchone()
    print("this is ur row", row)

    if row is None:
        return jsonify({"ok": True, "data": None}), 200

    return jsonify({"ok": True, "data": dict(row)}), 200

@stats_bp.get("/stats/last30days/<int:userId>")
def get_last_30_days(userId):
    conn = get_db()
    cur = conn.execute(
        """
        SELECT
            DATE(start_time) AS day,
            SUM(number_of_drops) AS drop_count
        FROM config
        WHERE user_id = ?
          AND start_time IS NOT NULL
          AND DATE(start_time) >= DATE('now', '-30 days')
        GROUP BY day
        ORDER BY day ASC
        """,
        (userId,),
    )

    rows = cur.fetchall()

    data = [
        {
            "date": row["day"],
            "drop_count": row["drop_count"],
        }
        for row in rows
    ]

    return jsonify({"ok": True, "data": data}), 200


    
