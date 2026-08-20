"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";

const INITIAL: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, INITIAL);

  return (
    <form className="admin-card" action={action}>
      <h2>Sign in</h2>
      <p className="hint">Enter your administrator credentials.</p>

      {state.error && (
        <div className="admin-alert error" role="alert">
          {state.error}
        </div>
      )}

      <div className="admin-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          defaultValue={state.email}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <button type="submit" className="btn-admin primary w-100" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
