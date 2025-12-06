import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./features/auth/LoginPage.jsx";
import SignupPage from "./features/auth/SignupPage.jsx";
import ConfigPage from "./features/config/ConfigPage.jsx";
import RunPage from "./features/runpage/RunPage.jsx";
import { getUserId } from "./lib/storage/userStorage.js";

export default function App() {
  // React controlled auth state
  const [loggedIn, setLoggedIn] = useState(() => !!getUserId("user_id"));

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



