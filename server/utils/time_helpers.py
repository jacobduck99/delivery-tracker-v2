


def to_utc_iso(time_str):
    local = pytz.timezone("Australia/Melbourne")
    dt = datetime.fromisoformat(time_str)
    dt_localized = local.localize(dt)
    return dt_localized.astimezone(pytz.UTC).isoformat()
