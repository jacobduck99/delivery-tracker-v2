
from flask import Blueprint, request, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from sqlite3 import IntegrityError
import traceback

from data.database import get_db

run_bp = Blueprint("run", __name__)

@run_bp.get("/run/<int:run_id>")
def get_run(run_id):
    conn = get_db()
    cur = conn.execute(
        """
        SELECT
            drop_idx,
            address,
            start_ts,
            end_ts,
            elapsed,
            expected_minutes,
            status,
            sync_status
        FROM deliveries
        WHERE run_id = ?
        ORDER BY drop_idx
        """,
        (run_id,),
    )
    rows = cur.fetchall()

    if not rows:
        return jsonify({"ok": True, "deliveries": []}), 200

    # rows are Row objects turn them into plain dicts
    deliveries = [dict(row) for row in rows]

    return jsonify({"ok": True, "run_id": run_id, "deliveries": deliveries}), 200





