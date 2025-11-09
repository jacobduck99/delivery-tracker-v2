import { useState } from "react";
import "../auth/authpage.module.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="auth-center">
      <div className="auth-card">
        <h1>Sign In</h1>

        <div className="auth-field">
          <label className="auth-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="auth-input"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="e.g. jacob@example.com"
          />
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="password">Password</label>
          <input
            id="password"
            className="auth-input"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button className="auth-submit">Sign In</button>
      </div>
    </div>
  );
}
