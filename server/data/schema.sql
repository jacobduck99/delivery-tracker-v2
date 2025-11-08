-- add other schemas in as you build

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS config (
  van_number           INTEGER NOT NULL,
  van_name             TEXT    NOT NULL,
  start_time           TEXT    NOT NULL,
  first_break          TEXT,
  second_break         TEXT,
  end_time             TEXT,
  number_of_drops      INTEGER NOT NULL CHECK (number_of_drops >= 0),
  truck_damage         TEXT DEFAULT NULL
);

-- ✅ FIX THESE
CREATE INDEX IF NOT EXISTS idx_config_start ON config(start_time);
CREATE INDEX IF NOT EXISTS idx_config_van   ON config(van_number, start_time);


