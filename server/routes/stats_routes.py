
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
           start_time,
           end_time,
           actual_end_time,
           truck_damage
           FROM config
           WHERE run_id = ?
        """,
        (run_id,),
    )
    config_row = cur.fetchone()

    deliveries = [dict(row) for row in rows]
    
    drops = len(deliveries)

    total_elapsed = 0
    for time in deliveries:
        if time["elapsed"] == 0:
            continue
        total_elapsed += time["elapsed"]
    avg_drop = total_elapsed / drops
   
    shift_duration = config_row["end_time"] - config_row["start_time"] 

    truck_damage = config_row["truck_damage"] 

    stats = {
        "Drops": drops,
        "Duration": shift_duration,
        "Average_time": avg_drop
    }
    
    return jsonify({"ok": True, "data": stats}), 200
    
    



