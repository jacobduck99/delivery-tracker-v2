import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./features/auth/LoginPage.jsx";
import SignupPage from "./features/auth/SignupPage.jsx";
import ConfigPage from "./features/config/ConfigPage.jsx";
import RunPage from "./features/runpage/RunPage.jsx";
import { getUserId } from "./lib/storage/userStorage.js";
import { loadPendingEndShift, queueEndingShift, clearCurrentRun, drainEndShiftQueue} from "./lib/storage/runStorage.js";
import { endShift } from "./lib/api/runApi.js";

export default function App() {
  // React controlled auth state
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
            drainEndShiftQueue();
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
        <Route path="/run" element={<RunPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}



