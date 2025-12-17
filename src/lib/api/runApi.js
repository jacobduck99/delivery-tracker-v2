
const API_BASE = import.meta.env.VITE_API_URL;

export async function getDrops(run_id) {
    const url = `${API_BASE}/api/run/${run_id}`; // TEMP: bypass Vite proxy & correct run id
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        return null;
    } 
 
}
export async function syncPendingDrops(runId, drop) {
    const run_id = runId; 
    const singleDrop = drop
    const dropidx = singleDrop.drop_idx; 
    const url = `${API_BASE}/api/run/${run_id}/${dropidx}`;
    let res;

    try {
        res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(singleDrop),
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

    return body || { ok: true };
    }

export async function endShift(run_id, end) { 
    const url = `${API_BASE}/api/run/end/${run_id}/${end}`;

    let res;

    try {
        res = await fetch(url, {
        method: "POST"
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

    return body || { ok: true };

}


