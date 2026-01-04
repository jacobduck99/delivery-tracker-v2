import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import AccountPage from "./features/accountpage/AccountPage.jsx";
import StatsPage from "./features/statspage/StatsPage.jsx";
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
import { logout } from "./lib/api/logoutApi.js";
import { clearAccount } from "./lib/storage/logoutStorage.js";
import { getProfile } from "./lib/api/profileApi.js";

export default function App() {
  // React controlled auth state
    const [runId, setRunId] = useState(null);
    const [loggedIn, setLoggedIn] = useState(() => !!getUserId("user_id"));
    const [profileName, setProfileName] = useState("");

    useEffect(() => {
      async function getProfileName() {
        const userId = getUserId();
        const result = await getProfile(userId);

        console.log("profile result:", result);

        if (result.ok) {
          setProfileName(result.profile);
                console.log("heres ur name", profileName);
        } else {
          setProfileName("user");
        }
      }

      getProfileName();
    }, []);

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
            <AppLayout />
        </BrowserRouter>

    );

    function AppLayout() {
        const [displayName, setDisplayName] = useState("");

        const navigate = useNavigate();
        const location = useLocation();
        const hideNavbar = location.pathname === "/config" || location.pathname === "/account" || location.pathname === "/stats";
        console.log("this is ur hide nav", hideNavbar);

    async function logoutUser() {
            const result = await logout();

            if (result.ok) {
                clearAccount();
                setLoggedIn(false);
                navigate("/login"); 
            }
        } 

      return (
        <>
          {loggedIn && !hideNavbar && <Navbar />}

          <Routes>
            <Route
              path="/"
              element={
                loggedIn
                  ? <Navigate to="/run" replace />
                  : <Navigate to="/login" replace />
              }
            />

            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/signup" element={<SignupPage setLoggedIn={setLoggedIn}/>} />

            <Route path="/config" element={<ConfigPage />} />
            <Route path="/run" element={<RunPage runId={runId} setRunId={setRunId} profileName={profileName} />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/account" element={<AccountPage setDisplayName={setDisplayName} displayName={displayName} logoutUser={logoutUser} />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      );
    }

}



