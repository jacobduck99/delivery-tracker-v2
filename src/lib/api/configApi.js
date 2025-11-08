
// lib/api/configApi.js
export async function saveConfigToServer(payload) {
  const res = await fetch("/api/config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // Try JSON first, fall back to text (HTML)
    try {
      const j = await res.json();
      throw new Error(j?.error || `Server ${res.status}`);
    } catch {
      const t = await res.text();
      throw new Error(t || `Server ${res.status}`);
    }
  }

  try {
    return await res.json();
  } catch {
    return { ok: true }; // in case server returns 201 with empty body
  }
}

