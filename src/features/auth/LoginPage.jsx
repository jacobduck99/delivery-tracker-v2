import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  function updateField(field, value) {
    setLogin((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <h1>Login</h1>

      <label htmlFor="username">User Name</label>
      <input
        id="username"
        value={login.username}
        onChange={(e) => updateField("username", e.target.value)}
        placeholder="e.g Jacob@fkcoles.com"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={login.password}
        onChange={(e) => updateField("password", e.target.value)}
        placeholder="••••••••"
      />
    </div>
  );
}

