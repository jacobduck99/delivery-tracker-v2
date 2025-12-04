import { useState, useEffect } from "react";
import { getDrops, savePendingDrops } from "../../lib/api/runApi.js";
import Dropcard from "../../components/dropcard.jsx";
import { saveDeliveries, loadDeliveries, addCompletedLs } from "../../lib/storage/runStorage.js";

export default function RunPage() {
    const [drops, setDrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [runId, setRunId] = useState(null);
    
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
        setRunId(data.run_id);
        const cache = loadDeliveries(data.run_id);
        if (!cache) {
        setDrops(data.deliveries || []); 
        saveDeliveries(data.run_id, data.deliveries);
        console.log(data.deliveries)
                }
        else {
            setRunId(data.run_id);
            setDrops(cache);
                }
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

    const currentDrops = drops.filter(drop => drop.status === "Navigating" || drop.status === "In-progress" || drop.status === "Finishing");

    const completedDrops = drops.filter( (drop) => drop.status === "Completed" );

    console.log(drops);

    function onChangeStatus(drop_idx, newStatus) {
        setDrops(prev => {
        const nextDrops = prev.map(drop =>
        drop.drop_idx === drop_idx
        ? { ...drop, status: newStatus }
        : drop
        );

    saveDeliveries(runId, nextDrops);
    return nextDrops;
  });    
    if (newStatus === "Completed") {
            addCompletedLs(runId, drop_idx)
        }
}

    function onChangeSyncStatus(drop_idx, newSyncStatus) {
        setDrops(prev => {
            const nextDrops = prev.map(drop => 
            drop.drop_idx === drop_idx
            ? {...drop, sync_status: newSyncStatus }
            : drop
        );
            saveDeliveries(runId, nextDrops);
            return nextDrops;
    });
}

    function onChangeStart(drop_idx, newStart) {
        setDrops(prev => { 
        const nextDrops = prev.map(drop => 
        drop.drop_idx === drop_idx
            ? {...drop, start_ts: newStart }
            : drop
        );
        saveDeliveries(runId, nextDrops);
        return nextDrops;
    });
    }


    function onChangeAddress(drop_idx, newAddress) {
        setDrops(prev => {
            const nextDrops = prev.map(drop => 
            drop.drop_idx === drop_idx
            ? {...drop, address: newAddress }
            : drop);
            saveDeliveries(runId, nextDrops);
            return nextDrops;
        });
    }

    function onChangeStop(drop_idx, newStop) {
        setDrops(prev => {
        const nextDrops = prev.map(drop => 
        drop.drop_idx === drop_idx
            ? {...drop, end_ts: newStop }
            : drop );
            saveDeliveries(runId, nextDrops);
            return nextDrops;
        });
    }

    function onChangeElapsed(drop_idx, ms) {
        setDrops(prev => {
        const nextDrops = prev.map(drop => 
        drop.drop_idx === drop_idx
            ? {...drop, elapsed: ms }
            : drop );
            saveDeliveries(runId, nextDrops);
            return nextDrops;
        });
    }


    const currentDrop = currentDrops[0] ?? upcomingDrops[0] ?? null;

    const remainingUpcoming = currentDrop
    ? upcomingDrops.filter(d => d.drop_idx !== currentDrop.drop_idx) : upcomingDrops;

return (
  <div className="container">
    <h1>Run Page</h1>

    <p>Loaded {drops.length} drops.</p>
     
    <details>
      <summary>
        <span>Completed drops</span>
        <span className="count"> {completedDrops.length}</span>
      </summary>
        
      <ul className="run-list completed-list" id="completed-list"> {completedDrops.map((drop, index) => (
        <Dropcard
            key={drop.drop_idx ?? index}
            index={drop.drop_idx}
            drop={drop} 
            onChangeStatus={onChangeStatus}
            onChangeAddress={onChangeAddress}
            onChangeStart={onChangeStart}
            onChangeStop={onChangeStop}
            onChangeElapsed={onChangeElapsed}
            onChangeSyncStatus={onChangeSyncStatus}
            addCompletedLs={addCompletedLs}
        />
      ))} 
      </ul>
      </details>

    <section id="current-drop-slot" className="drops">
        {currentDrop && (
        <Dropcard
        key={currentDrop.drop_idx}
        index={currentDrop.drop_idx}
        drop={currentDrop}
        onChangeStatus={onChangeStatus}
        onChangeAddress={onChangeAddress}
        onChangeStart={onChangeStart}
        onChangeStop={onChangeStop}
        onChangeElapsed={onChangeElapsed}
        onChangeSyncStatus={onChangeSyncStatus}
        addCompletedLs={addCompletedLs}
         />
            )}
        </section>

    <details>
      <summary>
        <span>Upcoming drops</span>
        <span className="count"> {remainingUpcoming.length}</span>
      </summary>
    
<ul className="run-list upcoming-list" id="upcoming-list">
  {remainingUpcoming.map((drop, index) => (
    <Dropcard
        key={drop.drop_idx ?? index}
        index={drop.drop_idx}
        drop={drop}
        onChangeStatus={onChangeStatus}
        onChangeAddress={onChangeAddress}
        onChangeStart={onChangeStart}
        onChangeStop={onChangeStop}
        onChangeElapsed={onChangeElapsed}
        onChangeSyncStatus={onChangeSyncStatus}
        addCompletedLs={addCompletedLs}
    />
  ))}
</ul>

    </details>
  </div>
);
}
