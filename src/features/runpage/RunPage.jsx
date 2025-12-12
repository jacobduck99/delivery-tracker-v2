import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// UI Components
import Dropcard from "../../components/dropcard.jsx";
import Circleprogress, { Card } from "../../components/progresscircle.jsx";
import { EndshiftBtn, EndShiftModal } from "../../components/buttons.jsx";
// API
import { syncPendingDrops, endShift } from "../../lib/api/runApi.js";
// Feature loader
import { loadDrops } from "./runloader.js";
// Storage: run + deliveries
import { 
  saveDeliveries, 
  loadRun, 
  loadDeliveries, 
  savePendingDrop, 
  loadPendingQueue, 
  drainQueue 
} from "../../lib/storage/runStorage.js";
// Storage: end-shift
import { 
  clearCurrentRun, 
  resetRun, 
  queueEndingShift, 
  drainEndShiftQueue,
  loadPendingEndShift
} from "../../lib/storage/endshiftStorage.js";
// State update helpers
import { 
  updateDropStatus,
  showElapsedTime,
  markDropPending,
  updateDropStart,
  updateDropAddress,
  updateDropStop
} from "../../lib/storage/syncStorage.js";

// haven't cached any files for pwa do that once add more things

export default function RunPage({runId, setRunId}) {
    const [drops, setDrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const [modal, showModal] = useState(false); 
    const [isEndShiftVisible, setIsEndShiftVisible] = useState(true);
 
useEffect(() => {
    async function init() {
        const result = await loadDrops();

        if (!result.ok) {
            setErr(result.error);
            return;
        }

        setRunId(result.runId);
        setDrops(result.deliveries);
        setLoading(false);
    }

    init();
}, []);

useEffect(() => {
  if (!runId) return;

  const deliveries = loadDeliveries(runId);
  if (!deliveries) return;

  const completedPending = deliveries.filter(
    d => d.status === "Completed" && d.sync_status === "Pending"
  );

  completedPending.forEach(drop => {
    savePendingDrop({
      ...drop,
      sync_status: "Ready"
    });
  });
}, [drops, runId]);

if (err) {
  return (
    <div className="container">
      <p style={{ color: "red" }}>{err}</p>
    </div>
  );
}

if (loading) {
    return (
        <div className="container">
            <p>Loading run…</p>
        </div>
        );
        }

    const upcomingDrops = drops.filter( (drop) => drop.status === "Not-started" ); 

    const currentDrops = drops.filter(drop => drop.status === "Navigating" || drop.status === "In-progress" || drop.status === "Finishing");

    const completedDrops = drops.filter( (drop) => drop.status === "Completed" ); 

    console.log(drops);

    function onChangeStatus(drop_idx, newStatus) {
        setDrops(prev => { 
            const nextDrops = updateDropStatus(prev, drop_idx, newStatus);
            saveDeliveries(runId, nextDrops);
            return nextDrops;
        });    
        }

    function onChangeSyncStatus(drop_idx, newSyncStatus) {
        setDrops(prev => { 
            const nextDrops = markDropPending(prev, drop_idx, newSyncStatus);
            saveDeliveries(runId, nextDrops);
            return nextDrops;
        });
    }

    function onChangeStart(drop_idx, newStart) {
        setDrops(prev => { 
        const nextDrops = updateDropStart(prev, drop_idx, newStart);
        saveDeliveries(runId, nextDrops);
        return nextDrops;
    });
    }

    function onChangeAddress(drop_idx, newAddress) {
        setDrops(prev => {
            const nextDrops = updateDropAddress(prev, drop_idx, newAddress);
            saveDeliveries(runId, nextDrops);
            return nextDrops;
        });
    }

    function onChangeStop(drop_idx, newStop) {
        setDrops(prev => {
            const nextDrops = updateDropStop(prev, drop_idx, newStop);
            saveDeliveries(runId, nextDrops);
            return nextDrops;
        });
    }

    function onChangeElapsed(drop_idx, ms) {
        setDrops(prev => {
            const nextDrops = showElapsedTime(prev, drop_idx, ms);
            saveDeliveries(runId, nextDrops);
            return nextDrops;
        });
    }

    const currentDrop = currentDrops[0] ?? upcomingDrops[0] ?? null;

    const remainingUpcoming = currentDrop
    ? upcomingDrops.filter(d => d.drop_idx !== currentDrop.drop_idx) : upcomingDrops;

    function handleEndShift() { 
        console.log("runId =", runId);
        const end = Date.now(); 
        const endRun = { runid: runId, endShift: end, synced_status: "Pending"}
        queueEndingShift(endRun);
        navigate("/config");
        
        window.dispatchEvent(new Event("online")); 
    };

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
            savePendingDrop={savePendingDrop}
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
          savePendingDrop={savePendingDrop}
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
            savePendingDrop={savePendingDrop}
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
