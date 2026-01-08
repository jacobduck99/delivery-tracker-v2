
const API_BASE = import.meta.env.VITE_API_URL;

export async function updatePassword(payload) {
  const url = `${API_BASE}/api/updatePassword`; // TEMP: bypass Vite proxy
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    // Network-level failure (server down, wrong port, mixed content)
    console.error("Network error:", e);
    throw new Error("Network error. Is Flask running on :5000?");
  }

  // Read body safely whether JSON or HTML
  const ct = res.headers.get("content-type") || "";
  const body = ct.includes("application/json") ? await res.json().catch(() => null)
                                               : await res.text().catch(() => "");

  if (!res.ok) {
    const msg = body?.error || (typeof body === "string" ? body : "");
    console.error("Server error:", res.status, body);
    throw new Error(msg || `Server ${res.status}`);
  }

  return body || { ok: true }; }
