import { useState } from "react";
import s from "./authpage.module.css";
import { login } from "../../lib/api/loginApi.js";
import { useNavigate } from 'react-router-dom';
import { saveUserId } from "../../lib/storage/userStorage.js";


export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [err, setErr] = useState(""); 
    const navigate = useNavigate();

    function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
    try {
            const data = await login(form); 
            saveUserId(data.user);
            navigate("/config");
        } catch (e) {
            setErr(e.message || "Login failed")
        }
    }

    function handleClick() {
        navigate("/signup");
    }

    return (
    <div className={s.authCenter}>
      <div className={s.authCard}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
        <div className={s.authField}>
          <label className={s.authLabel} htmlFor="email">Email</label>
          <input
            id="email"
            className={s.authInput}
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="e.g. jacob@example.com"
          />
        </div>

        <div className={s.authField}>
          <label className={s.authLabel} htmlFor="password">Password</label>
          <input
            id="password"
            className={s.authInput}
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className={s.authRedirect}>
            <a onClick={handleClick}>Don't have an account?</a>
        </div>

        <button className={s.authSubmit}>Sign In</button>
        {err && <p className={s.authError}>{err}</p>}
        </form>
      </div>
    </div>
  );
}
