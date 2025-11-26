import { useState, useEffect } from "react";
import { getDrops } from "../../lib/api/runApi.js";
import Dropcard from "../../components/dropcard.jsx";
import Gps from "../../components/gps.jsx";

export default function RunPage() {
  const [drops, setDrops] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDrops() {
      setLoading(true);
      setErr("");

      const data = await getDrops();

      if (cancelled) return;

      if (data === null) {
        setErr("Failed to load drops from server");
        setDrops(null);
      } else {
        setDrops(data.deliveries || []);
      }

      setLoading(false);
    }

    loadDrops();
    return () => {
      cancelled = true;
    };
  }, []);


if (loading) {
  return (
    <div className="container">
      <p>Loading run…</p>
    </div>
  );
}

if (err) {
  return (
    <div className="container">
      <p style={{ color: "red" }}>{err}</p>
    </div>
  );
}

if (!drops || drops.length === 0) {
  return (
    <div className="container">
      <p>No drops found.</p>
    </div>
  );
}

return (
  <div className="container">
    <h1>Run Page</h1>

    <p>Loaded {drops.length} drops.</p>

    {drops.map((drop, index) => (
      <Dropcard
        key={drop.drop_idx ?? index}
        index={index}
        drop={drop}
      />
    ))}

    <pre style={{ background: "#eee", padding: "10px" }}>
      {JSON.stringify(drops[0], null, 2)}
    </pre>
  </div>
);
}
