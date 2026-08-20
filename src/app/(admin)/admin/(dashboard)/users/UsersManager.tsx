"use client";

import { useState, useTransition } from "react";
import { changePassword, createUser, deleteUser } from "@/server/actions";
import type { Role } from "@/generated/prisma/client";

export interface UserRow {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: Role;
  readonly lastLoginAt: string | null;
  readonly createdAt: string;
}

export function UsersManager({
  users,
  actorId,
}: {
  readonly users: readonly UserRow[];
  readonly actorId: string;
}) {
  const [status, setStatus] = useState<{ ok?: string; error?: string }>({});
  const [pending, start] = useTransition();

  return (
    <>
      {status.error && <div className="admin-alert error">{status.error}</div>}
      {status.ok && <div className="admin-alert ok">{status.ok}</div>}

      <div className="admin-card">
        <h2>Accounts</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Last signed in</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.name}
                  {user.id === actorId && <span className="hint"> (you)</span>}
                </td>
                <td>{user.email}</td>
                <td>{user.role === "ADMIN" ? "Administrator" : "Editor"}</td>
                <td>
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleString("en-GB")
                    : "never"}
                </td>
                <td className="text-end">
                  <PasswordButton userId={user.id} name={user.name} setStatus={setStatus} />
                  {user.id !== actorId && (
                    <button
                      type="button"
                      className="btn-admin ghost ms-2"
                      style={{ fontSize: "0.8rem", padding: "4px 10px", color: "var(--admin-danger)" }}
                      disabled={pending}
                      onClick={() => {
                        if (!confirm(`Delete ${user.email}? This cannot be undone.`)) return;
                        start(async () => {
                          const result = await deleteUser(user.id);
                          setStatus(result.error ? { error: result.error } : { ok: "Account deleted." });
                        });
                      }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateAccountForm onStatus={setStatus} />
    </>
  );
}

function PasswordButton({
  userId,
  name,
  setStatus,
}: {
  readonly userId: string;
  readonly name: string;
  readonly setStatus: (status: { ok?: string; error?: string }) => void;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      className="btn-admin ghost"
      style={{ fontSize: "0.8rem", padding: "4px 10px" }}
      disabled={pending}
      onClick={() => {
        const password = prompt(`New password for ${name} (at least 10 characters):`);
        if (!password) return;
        start(async () => {
          const result = await changePassword(userId, password);
          setStatus(
            result.error
              ? { error: result.error }
              : { ok: `Password changed. ${name} has been signed out everywhere.` },
          );
        });
      }}
    >
      Change password
    </button>
  );
}

const EMPTY_DRAFT = { name: "", email: "", password: "", role: "EDITOR" };

/**
 * Controlled rather than uncontrolled on purpose.
 *
 * React resets a form after its action resolves — including when the action *failed* — which
 * would wipe everything the user typed the moment they hit a validation error. Holding the
 * draft in state means a rejected submission keeps its values and only a success clears them.
 */
function CreateAccountForm({
  onStatus,
}: {
  readonly onStatus: (status: { ok?: string; error?: string }) => void;
}) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [pending, start] = useTransition();
  const patch = (next: Partial<typeof EMPTY_DRAFT>) =>
    setDraft((current) => ({ ...current, ...next }));

  return (
    <div className="admin-card">
      <h2>Add an account</h2>
      <p className="hint">
        The new user signs in with this email and password. Passwords are stored as scrypt
        digests and are never shown again.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          start(async () => {
            const formData = new FormData();
            for (const [key, value] of Object.entries(draft)) formData.set(key, value);
            const result = await createUser(formData);
            if (result.error) {
              onStatus({ error: result.error });
            } else {
              onStatus({ ok: "Account created." });
              setDraft(EMPTY_DRAFT);
            }
          });
        }}
      >
        <div className="admin-grid">
          <div className="admin-field">
            <label htmlFor="new-name">Name</label>
            <input
              id="new-name"
              type="text"
              value={draft.name}
              onChange={(event) => patch({ name: event.target.value })}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="new-email">Email</label>
            <input
              id="new-email"
              type="email"
              autoComplete="off"
              value={draft.email}
              onChange={(event) => patch({ email: event.target.value })}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="new-password">Password</label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={draft.password}
              onChange={(event) => patch({ password: event.target.value })}
            />
            <div className="help">At least 10 characters.</div>
          </div>
          <div className="admin-field">
            <label htmlFor="new-role">Role</label>
            <select
              id="new-role"
              value={draft.role}
              onChange={(event) => patch({ role: event.target.value })}
            >
              <option value="EDITOR">Editor — content only</option>
              <option value="ADMIN">Administrator — content and accounts</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-admin primary" disabled={pending}>
          {pending ? "Creating…" : "Create account"}
        </button>
      </form>
    </div>
  );
}
