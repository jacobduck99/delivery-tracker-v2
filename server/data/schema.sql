PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    email           TEXT NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    status          INTEGER NOT NULL DEFAULT 1,
    created_at      TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS config (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id             INTEGER NOT NULL,
    van_number          INTEGER NOT NULL,
    van_name            TEXT    NOT NULL,
    start_time          TEXT    NOT NULL,
    first_break         TEXT,
    second_break        TEXT,
    end_time            TEXT,
    number_of_drops     INTEGER NOT NULL CHECK (number_of_drops >= 0),
    truck_damage        TEXT DEFAULT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS deliveries (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id           INTEGER NOT NULL,   -- this points at config.id (your "run")
    drop_idx         INTEGER NOT NULL,   
    start_ts         TEXT,
    end_ts           TEXT,
    elapsed          INTEGER,
    expected_minutes REAL,
    status           TEXT,
    FOREIGN KEY (run_id) REFERENCES config(id) ON DELETE CASCADE,
    UNIQUE (run_id, drop_idx)
);

CREATE INDEX IF NOT EXISTS idx_deliveries_run_id ON deliveries(run_id);

CREATE INDEX IF NOT EXISTS idx_config_user_id ON config(user_id);
CREATE INDEX IF NOT EXISTS idx_config_start   ON config(start_time);
CREATE INDEX IF NOT EXISTS idx_config_van     ON config(van_number, start_time);

