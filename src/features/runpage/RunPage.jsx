import { useState, useEffect } from "react";
import { getDrops } from "../../lib/api/runApi.js";
import Dropcard from "../../components/dropcard.jsx";
import Gps from "../../components/gps.jsx";
import { startGps } from "../../components/nav.js";

export default function RunPage() {
    const [drops, setDrops] = useState([]);
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
        console.log(data.deliveries)
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

    const upcomingDrops = drops.filter( (drop) => drop.status === "Not-started" ); 

    const currentDrops = drops.filter( (drop) => drop.status === "In-progress" );

    const firstDrop = drops[0];
    const restDrops = drops.slice(1);

return (
  <div className="container">
    <h1>Run Page</h1>

    <p>Loaded {drops.length} drops.</p>
    
    <Dropcard 
        key={firstDrop}
        index={firstDrop.drop_idx}
        drop={firstDrop}
        />
    
    <details>
      <summary>
        <span>Upcoming drops</span>
        <span className="count"> {upcomingDrops.length}</span>
      </summary>

      <ul className="run-list upcoming-list" id="upcoming-list">
        {restDrops.map((drop, index) => (
        <Dropcard
            key={drop.drop_idx ?? index}
            index={index}
            drop={drop}
            />
        ))}
      </ul>
    </details>
  </div>
);
}
