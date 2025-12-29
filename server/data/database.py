import os, sqlite3
from pathlib import Path
from flask import g

# Defaults for local dev (your repo layout)
_DEFAULT_DB = Path(__file__).resolve().parent.parent / "data" / "database.db"
_DEFAULT_SCHEMA = Path(__file__).resolve().parent.parent / "data" / "schema.sql"

# Use Fly env vars if present (e.g. /data/database.db and /code/schema.sql)
DATABASE = Path(os.environ.get("DATABASE", str(_DEFAULT_DB)))
SCHEMA   = Path(os.environ.get("SCHEMA",   str(_DEFAULT_SCHEMA)))

def _ensure_dir():
    DATABASE.parent.mkdir(parents=True, exist_ok=True)

def init_db():
    _ensure_dir()
    with sqlite3.connect(DATABASE) as conn:
        conn.execute("PRAGMA foreign_keys = ON")
        with open(SCHEMA, "r", encoding="utf-8") as f:
            conn.executescript(f.read())

def ensure_db():
    _ensure_dir()
    p = Path(DATABASE)
    if (not p.exists()) or p.stat().st_size == 0:
        init_db()

def get_db():
    if "db" not in g:
        _ensure_dir()
        conn = sqlite3.connect(DATABASE, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        conn.execute("PRAGMA journal_mode = WAL")
        g.db = conn
    return g.db

def close_db(error=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()

