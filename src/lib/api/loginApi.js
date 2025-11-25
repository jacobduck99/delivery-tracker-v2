const API_BASE = import.meta.env.VITE_API_URL;

export async function login(payload) {
    const url = `${API_BASE}/api/auth/login`;
    let res;
    try {
        res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });
    } catch (e) {
        console.error("Network error:", e);
        throw new Error("Network error. is Flask running on :5000?")
    }

    const ct = res.headers.get("content-type") || "";
    const body = ct.includes("application/json") ? await res.json().catch(() => null)
                                                 : res.text().catch(() => "");

    if (!res.ok) {
    const msg = body?.error || (typeof body === "string" ? body : "");
    console.error("Server error:", res.status, body);
    throw new Error(msg || `Server ${res.status}`);
  }

  return body || { ok: true };
}

