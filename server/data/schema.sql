
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS config (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  van_number           INTEGER NOT NULL,
  van_name             TEXT    NOT NULL,
  start_time           TEXT    NOT NULL,
  first_break          TEXT,
  second_break         TEXT,
  end_time             TEXT,
  actual_end_time_at   TEXT,
  duration_ms          INTEGER,
  number_of_drops      INTEGER NOT NULL CHECK (number_of_drops >= 0),
  truck_damage         TEXT DEFAULT NULL
                       CHECK (truck_damage IS NULL OR length(truck_damage) <= 255),
  CHECK (duration_ms IS NULL OR duration_ms >= 0),
  CHECK (end_time IS NULL OR start_time <= end_time)
);

-- ✅ FIX THESE
CREATE INDEX IF NOT EXISTS idx_config_start ON config(start_time);
CREATE INDEX IF NOT EXISTS idx_config_van   ON config(van_number, start_time);


