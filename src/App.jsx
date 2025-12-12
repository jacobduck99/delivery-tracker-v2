import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./features/auth/LoginPage.jsx";
import SignupPage from "./features/auth/SignupPage.jsx";
import ConfigPage from "./features/config/ConfigPage.jsx";
import RunPage from "./features/runpage/RunPage.jsx";
import { getUserId } from "./lib/storage/userStorage.js";
import { loadPendingEndShift, resetRun, queueEndingShift, clearCurrentRun, drainEndShiftQueue} from "./lib/storage/endshiftStorage.js";
import { endShift, syncPendingDrops } from "./lib/api/runApi.js";
import { loadPendingQueue, savePendingQueue } from "./lib/storage/runStorage.js";

export default function App() {

console.log("APP RENDER");
  // React controlled auth state
    const [runId, setRunId] = useState(null);
    const [loggedIn, setLoggedIn] = useState(() => !!getUserId("user_id"));

useEffect(() => {
  if (!runId) return;

  console.log("SYNC WORKER START", { runId });

  syncWorker(runId);

  const handleOnline = () => syncWorker(runId);
  window.addEventListener("online", handleOnline);

  return () => window.removeEventListener("online", handleOnline);
}, [runId]);

useEffect(() => {
    async function syncEndShift() {
        const pending = loadPendingEndShift();
        if (!pending) return;
        if (pending.synced_status !== "Pending") return;

        const result = await endShift(pending.runid, pending.endShift);

        if (result.ok) {
            const synced = { ...pending, synced_status: "Completed" };
            queueEndingShift(synced);
            clearCurrentRun();
            drainEndShiftQueue();
            resetRun(runId);
            console.log("End shift synced:", result);
        }
    }
    // run at startup
    syncEndShift();
    console.log("SYNC STARTED", Date.now());

    // run when online
    window.addEventListener("online", syncEndShift);
    return () => window.removeEventListener("online", syncEndShift);

}, []);

let syncing = false;

async function syncWorker(runId) {
  if (syncing) return;
  syncing = true;

  const queue = loadPendingQueue("Pending_queue_v1");
        console.log(queue);
  if (!queue || queue.length === 0) {
    syncing = false;
    return;
  }

  const remaining = [];

  for (const job of queue) {
    if (job.sync_status !== "Ready") {
      remaining.push(job);
      continue;
    }

    const result = await syncPendingDrops(runId, job);
    console.log(result);

    if (!result.ok) {
      // stop on failure, retry later
      remaining.push(job);
      break;
    }

    // success → DO NOT re-add
  }
syncWorker();
  savePendingQueue(remaining);
  syncing = false;
}

  return (
    <BrowserRouter>
      <Routes>

        {/* Boot route */}
        <Route
          path="/"
          element={
            loggedIn
              ? <Navigate to="/run" replace />
              : <Navigate to="/login" replace />
          }

        />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Private routes */}
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/run" element={<RunPage runId={runId} setRunId={setRunId}/>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}



