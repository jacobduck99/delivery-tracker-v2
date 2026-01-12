import { useState } from "react";
import s from "./authpage.module.css";
import { login } from "../../lib/api/loginApi.js";
import { useNavigate } from 'react-router-dom';
import { saveUserId } from "../../lib/storage/userStorage.js";


export default function LoginPage( {setLoggedIn }) {
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
            setLoggedIn(true); 
            navigate("/config");
        } catch (e) {
            setErr(e.message || "Login failed")
        }
    }

    function handleClick() {
        navigate("/signup");
    }

return (
  <div
    className="
      min-h-[100dvh] grid place-items-center p-5
      bg-[radial-gradient(1100px_520px_at_12%_12%,color-mix(in_oklch,var(--primary)_15%,transparent),transparent_60%),radial-gradient(900px_520px_at_88%_18%,color-mix(in_oklch,var(--ring)_10%,transparent),transparent_55%),var(--background)]
      text-[var(--foreground)]
    "
  >
    <div
      className="
        w-[min(440px,92vw)]
        rounded-[18px]
        border border-[var(--border)]
        bg-[var(--card)]
        text-[var(--card-foreground)]
        p-5
        shadow-[0_26px_70px_color-mix(in_oklch,var(--foreground)_10%,transparent),0_2px_12px_color-mix(in_oklch,var(--foreground)_6%,transparent)]
      "
    >
      <header className="text-center mb-4">
        <h1 className="text-[1.5rem] font-semibold tracking-[-0.02em]">
          Sign In
        </h1>
      </header>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-1.5">
          <label className="text-[0.92rem] text-[var(--muted-foreground)]">
            Email
          </label>
          <input
            className="
              w-full rounded-xl border border-[var(--input)]
              bg-[var(--background)] text-[var(--foreground)]
              px-4 py-3
              placeholder:text-[var(--muted-foreground)]
              focus:outline-none focus:border-[var(--ring)]
              focus:ring-4 focus:ring-[color-mix(in_oklch,var(--ring)_25%,transparent)]
            "
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jacob@example.com"
            required
          />
        </div>

        <div className="grid gap-1.5">
          <label className="text-[0.92rem] text-[var(--muted-foreground)]">
            Password
          </label>
          <input
            className="
              w-full rounded-xl border border-[var(--input)]
              bg-[var(--background)] text-[var(--foreground)]
              px-4 py-3
              placeholder:text-[var(--muted-foreground)]
              focus:outline-none focus:border-[var(--ring)]
              focus:ring-4 focus:ring-[color-mix(in_oklch,var(--ring)_25%,transparent)]
            "
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="
            mt-1 w-full rounded-[14px] px-4 py-3
            bg-[var(--primary)] text-[var(--primary-foreground)]
            font-semibold
            shadow-[0_14px_34px_color-mix(in_oklch,var(--primary)_25%,transparent)]
            hover:brightness-105 active:brightness-95
            transition
          "
        >
          Sign In
        </button>

        {err && (
          <p className="
            rounded-xl border border-[var(--destructive)]
            bg-[color-mix(in_oklch,var(--destructive)_12%,transparent)]
            px-4 py-3 text-sm
          ">
            {err}
          </p>
        )}

        <button
          type="button"
          onClick={handleClick}
          className="
            w-full rounded-xl px-3 py-3
            text-[var(--muted-foreground)]
            hover:text-[var(--foreground)]
            hover:bg-[var(--muted)]
            transition
          "
        >
          Don&apos;t have an account?{" "}
          <span className="font-semibold text-[var(--foreground)]">
            Create one
          </span>
        </button>
      </form>
    </div>
  </div>
);



}
