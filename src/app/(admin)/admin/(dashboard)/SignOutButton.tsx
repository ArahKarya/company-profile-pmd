"use client";

import { useTransition } from "react";
import { signOut } from "./actions";

export function SignOutButton() {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      className="btn-admin ghost"
      style={{ fontSize: "0.85rem", padding: "6px 12px" }}
      disabled={pending}
      onClick={() => start(() => void signOut())}
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
