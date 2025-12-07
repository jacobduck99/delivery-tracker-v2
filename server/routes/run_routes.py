
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

@run_bp.post("/run/<int:run_id>/<int:drop_idx>")
def update_drop(run_id, drop_idx):
    if request.method == "OPTIONS":
        return ("", 204)

    try:
        data = request.get_json(force=True) or {}

        runid = run_id
        dropidx = drop_idx

        address = data["address"]
        start_ts = data["start_ts"]
        end_ts = data["end_ts"]
        elapsed = data["elapsed"]
        expected_minutes = data["expected_minutes"]
        status = data["status"]
        sync_status = "Synced"

        conn = get_db()
        cur = conn.execute(
            """
            UPDATE deliveries
            SET
                address = ?,
                start_ts = ?,
                end_ts = ?,
                elapsed = ?,
                expected_minutes = ?,
                status = ?,
                sync_status = ?
            WHERE run_id = ? AND drop_idx = ?
            """,
            (address, start_ts, end_ts, elapsed, expected_minutes, status, sync_status, runid, dropidx),
        )

        conn.commit()

        if cur.rowcount != 1:
            return jsonify({"ok": False, "error": "Drop not found"}), 404

        return jsonify({"ok": True, "message": "Drop synced", "drop": drop_idx }), 200

    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 400


@run_bp.post("/run/end/<int:run_id>/<int:end_ts>")
def update_end_time(run_id, end_ts):
    if request.method == "OPTIONS":
        return ("", 204)

    try:
        conn = get_db()
        conn.execute(
            "UPDATE config SET actual_end_time = ? WHERE id = ?",
            (end_ts, run_id)
        )
        conn.commit()

        return jsonify({
    "ok": True,
    "message": "actual end time set",
    "end_ts": end_ts,
    "runId": run_id
}), 200

    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 400


