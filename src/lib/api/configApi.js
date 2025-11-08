

export async function saveConfigToServer(payload) {
  const res = await fetch("/api/config", {   // <-- no http://localhost:5000 anymore
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}


