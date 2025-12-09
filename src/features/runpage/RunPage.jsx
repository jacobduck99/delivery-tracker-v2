import { useState, useEffect } from "react";
import { getDrops, syncPendingDrops, endShift } from "../../lib/api/runApi.js";
import Dropcard from "../../components/dropcard.jsx";
import { saveDeliveries, loadDeliveries, syncCompletedLs, endShiftPendingSync, drainQueue, clearCurrentRun, loadPendingQueue, resetRun } from "../../lib/storage/runStorage.js";
import { useNavigate } from 'react-router-dom';
import Circleprogress, { Card } from "../../components/progresscircle.jsx";
import { EndshiftBtn, EndShiftModal } from "../../components/buttons.jsx";

// haven't cached any files for pwa do that once add more things

export default function RunPage() {
    const [drops, setDrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [runId, setRunId] = useState(null);
    const navigate = useNavigate();
    const [modal, showModal] = useState(false); 
    const [isEndShiftVisible, setIsEndShiftVisible] = useState(true);

    
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

    useEffect(() => {
        if (!drops || drops.length === 0) return;

        const completedPending = drops.filter(
        d => d.status === "Completed" && d.sync_status === "Pending"
        );

        completedPending.forEach(async (drop) => {
        syncCompletedLs(runId, drop);
        const result = await syncPendingDrops(runId, drop);

        if (result.ok) {
            onChangeSyncStatus(drop.drop_idx, "Synced");  
                console.log(result);
            }
        });

    }, [drops]);

    useEffect(() => {
        if (!drops || drops.length === 0) return;

        const syncedDrop = drops.filter(
            d => d.sync_status === "Synced"
        );

        syncedDrop.forEach(drop => {
           drainQueue(drop.drop_idx, runId); 
        })
    }, [drops]);

if (err) {
  return (
    <div className="container">
      <p style={{ color: "red" }}>{err}</p>
    </div>
  );
}

if (loading) {
    
    }

    const upcomingDrops = drops.filter( (drop) => drop.status === "Not-started" ); 

    const currentDrops = drops.filter(drop => drop.status === "Navigating" || drop.status === "In-progress" || drop.status === "Finishing");

    const completedDrops = drops.filter( (drop) => drop.status === "Completed" ); 

    console.log(drops);

if (!drops || drops.length === 0 || currentDrops.length === 0 && upcomingDrops.length === 0) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-xl font-semibold mb-4">No active drops</h1>

      <button
        onClick={() => { navigate("/config"); resetRun(runId);}}
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700"
      >
        Configure Shift
      </button>
    </div>
  );
}

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

    async function handleEndShift() { 
        console.log("runId =", runId);
        const end = Date.now();
        const endRun = { runid: runId, endShift: end, synced_status: "Pending"}
        endShiftPendingSync(endRun);
        const result = await endShift();
        if (result.ok) {
            const synced = { ...endRun, synced_status: "Completed"};
            endShiftPendingSync(synced);
            clearCurrentRun();
            console.log(result) 

        }
    };


    window.addEventListener("online", async () => {
        const getEndShift = loadPendingQueue("Pending_endShift_sync");
        if (getEndShift.synced_status === "Pending") {
            const result = await endShift(); 
        if (result.ok) {
            const synced = { ...getEndShift, synced_status: "Completed"};
            endShiftPendingSync(synced);
            clearCurrentRun();
        }
         }});

            

// WHERE THE CIRCLE PROGRESS AND PAGE STARTS 
return ( 
  <div className="min-h-screen bg-gray-100 px-4 pt-6 pb-20">
    <h1 className="flex justify-center text-[1.3rem] font-semibold">Your run for today Good luck!</h1>
    <div>
        <Card>
        <Circleprogress
        completed={completedDrops.length}
        total={drops.length}
        />
        </Card>
    </div>


    <details className="mb-4">
  
<summary className="flex items-center mt-8 gap-2 text-[1rem] font-medium cursor-pointer">
  <span>Completed</span>

  <span className="bg-green-200 text-green-700 text-xs px-2 py-0.5 rounded-full">
    {completedDrops.length}
  </span>


  <span className="text-gray-500 text-lg leading-none transition-transform group-open:rotate-90">
    ▸
  </span>
</summary>


      <ul className="space-y-4 mt-3">
        {completedDrops.map((drop, index) => (
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
            syncCompletedLs={syncCompletedLs}
          />
        ))}
      </ul>
    </details>

    {/* Current Drop */}
    <section id="current-drop-slot" className="drops mt-6 mb-6">
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
          syncCompletedLs={syncCompletedLs}
        />
      )}
    </section>

    {/* Upcoming Drops */}
    <details className="mb-4">
      <summary className="flex items-center gap-2 text-[1rem] font-medium cursor-pointer">
        <span>Remaining</span>
        <span className="bg-green-200 text-green-700 text-xs px-2 py-0.5 rounded-full">
          {remainingUpcoming.length}
        </span>

        <span className="text-gray-500 text-lg leading-none transition-transform group-open:rotate-90">
    ▸
  </span>
      </summary>

      <ul className="space-y-4 mt-3">
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
            syncCompletedLs={syncCompletedLs}
          />
        ))}
      </ul>
    </details>


<div className="flex mt-11 justify-center">

  {!modal && (
    <EndshiftBtn showModal={showModal} setIsEndShiftVisible={setIsEndShiftVisible} />
  )}

  {modal && (
    <EndShiftModal 
      showModal={showModal} 
      setIsEndShiftVisible={setIsEndShiftVisible}
      handleEndShift={handleEndShift}
    />
  )}

</div>
</div>

);

}
