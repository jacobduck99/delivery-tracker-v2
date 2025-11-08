from datetime import datetime, date, time
from zoneinfo import ZoneInfo

LOCAL = ZoneInfo("Australia/Melbourne")   # Your real-world timezone
UTC = ZoneInfo("UTC")

def to_utc_iso(value):
    """
    Accepts either:
      - "HH:MM" (local Melbourne time)
      - ISO datetime string (with or without timezone)
    Returns:
      - ISO-8601 UTC string with trailing 'Z'
    """
    value = (value or "").strip()
    if not value:
        return None

    # If string already looks like a datetime
    if "T" in value:
        # Convert to datetime, allow `Z` or offset
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
        # If no timezone, assume local Melbourne
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=LOCAL)
    else:
        # It's just "HH:MM"
        hh, mm = value.split(":")
        dt = datetime.combine(date.today(), time(int(hh), int(mm)), LOCAL)

    dt_utc = dt.astimezone(UTC)
    return dt_utc.replace(microsecond=0).isoformat().replace("+00:00", "Z")

