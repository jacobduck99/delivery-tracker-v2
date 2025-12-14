import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./features/auth/LoginPage.jsx";
import SignupPage from "./features/auth/SignupPage.jsx";
import ConfigPage from "./features/config/ConfigPage.jsx";
import RunPage from "./features/runpage/RunPage.jsx";
import { getUserId } from "./lib/storage/userStorage.js";
import { loadPendingEndShift, resetRun, queueEndingShift, clearCurrentRun, drainEndShiftQueue} from "./lib/storage/endshiftStorage.js";
import { loadPendingQueue } from "./lib/storage/runStorage.js";
import { endShift } from "./lib/api/runApi.js";
import { syncDrops } from "././features/runpage/syncMachine.js";
import Navbar from "./components/navbar.jsx";

export default function App() {
  // React controlled auth state
    const [runId, setRunId] = useState(null);
    const [loggedIn, setLoggedIn] = useState(() => !!getUserId("user_id"));
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
            resetRun(runId);
            drainEndShiftQueue();
            console.log("End shift synced:", result);
        }
    }

    // run at startup
    syncEndShift();
    syncDrops(runId);

    console.log("SYNC STARTED", Date.now());
    console.log("SYNC DROPS STARTED", Date.now());

    // run when online
    window.addEventListener("online", syncEndShift);
    return () => window.removeEventListener("online", syncEndShift);
    // NEED TO COME BACK HERE AND FIND OUT WHY THIS ISN'T FIRING WHEN BACK ONLINE
    window.addEventListener("online", syncDrops(runId));

}, []);

  return (
    <BrowserRouter>
    <Navbar />
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



