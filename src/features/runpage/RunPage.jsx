import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// UI Components
import Dropcard from "../../components/dropcard.jsx";
import Circleprogress, { Card } from "../../components/progresscircle.jsx";
import { EndshiftBtn, EndShiftModal, ConfigBtn } from "../../components/buttons.jsx";
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
  markDropSyncStatus,
  updateDropStart,
  updateDropAddress,
  updateDropStop
} from "../../lib/storage/syncStorage.js";

import { syncDrops } from "./syncMachine.js";

import { Camera } from 'lucide-react';

// haven't cached any files for pwa do that once add more things

export default function RunPage({ runId, setRunId }) {
    const [hasError, setHasError] = useState(false)
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
            setHasError(true)
            setErr(result.error);
            setLoading(false); 
            return;
        }

        setRunId(result.runId);
        setDrops(result.deliveries);
        setLoading(false);
    }

    init();
}, []);

if (loading) {
  return (
    <div className="container">
      <p>Loading run…</p>
    </div>
  );
}

    function navigateToConfig() {
      navigate("/config");
    }

    if (err) {
      return <ConfigBtn handleOnClick={navigateToConfig} />;
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

    function onChangeSyncStatus(drop_idx, newStatus) {
        setDrops(prev => {
        const next = markDropSyncStatus(prev, drop_idx, newStatus);
        saveDeliveries(runId, next);

        if (newStatus === "Ready") {
            const drop = next.find(d => d.drop_idx === drop_idx);

        savePendingDrop({
            job_id: `drop-${drop_idx}`,
            type: "SYNC_DROP",
            runId,
            drop_idx,
            payload: drop,
            status: "Ready",
            created_at: Date.now(),
        });

        syncDrops(runId);
        }

    return next;
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
  <div className="min-h-screen bg-gray-100 px-4 pt-1 pb-20">
    <div className="md:flex md:justify-center">
      <div className="w-full lg:mt-50 max-w-2xl md:flex md:flex-col md:items-center">
        
        <div className="text-[1.6rem] font-medium">
          Hello, Jacob
        </div>

        <div className="font-extralight">
          Here's todays run
        </div>
        <Card> 
          <Circleprogress
            completed={completedDrops.length}
            total={drops.length}
          />
        </Card>
      </div>
    </div>

    <details className="mb-4 md:flex md:justify-center">
  
<summary className="flex items-center mt-5 gap-2 text-[1rem] font-medium cursor-pointer">
  <span>Completed</span>

  <span className="bg-green-200 text-green-700 text-xs px-2 py-0.5 rounded-full">
    {completedDrops.length}
  </span>

  <span className="text-gray-500 text-lg leading-none transition-transform group-open:rotate-90">
    ▸
  </span>
</summary>

      
    <ul className="mt-3 space-y-4 md:flex md:flex-col md:items-center">

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
    <section className="drops mt-6 mb-6">
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
     <details className="mb-4 md:flex md:justify-center">

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

<div className="flex mt-14 justify-center">

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
