import { useState, useEffect } from "react";
import { getDrops } from "../../lib/api/runApi.js"; 

export default function RunPage() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      setLoading(true);
      setErr("");

      const data = await getDrops();

      if (cancelled) return;

      if (data === null) {
        setErr("Failed to load config from server");
        setConfig(null);
      } else {
        setConfig(data);
      }

      setLoading(false);
    }

    loadConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="container"><p>Loading run...</p></div>;
  }

  if (err) {
    return (
      <div className="container">
        <h1>Run Page</h1>
        <p style={{ color: "red" }}>{err}</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="container">
        <h1>Run Page</h1>
        <p>No config data found.</p>
      </div>
    );
  }

  // Handle both: API returns a single object OR an array of configs
  const configs = Array.isArray(config) ? config : [config];

  return (
    <div className="container">
      <h1>Run Page</h1>

      {configs.map((c, idx) => (
        <div key={c.id ?? idx} className="card">
          <h2>Config #{c.id ?? idx + 1}</h2>
          <p><strong>Van number:</strong> {c.van_number ?? c.vanNumber ?? "N/A"}</p>
          <p><strong>Van name:</strong> {c.van_name ?? c.vanName ?? "N/A"}</p>
          <p><strong>Start time:</strong> {c.start_time ?? c.startTime ?? "N/A"}</p>
          <p><strong>End time:</strong> {c.end_time ?? c.endTime ?? "N/A"}</p>
          <p><strong>Number of drops:</strong> {c.number_of_drops ?? c.numberOfDrops ?? "N/A"}</p>
          {c.truck_damage && (
            <p><strong>Truck damage:</strong> {c.truck_damage}</p>
          )}
        </div>
      ))}
    </div>
  );
}
