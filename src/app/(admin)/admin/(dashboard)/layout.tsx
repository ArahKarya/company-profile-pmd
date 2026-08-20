import Link from "next/link";
import { requireUser } from "@/server/auth";
import { AdminNav } from "./AdminNav";
import { SignOutButton } from "./SignOutButton";

/**
 * Guarded shell for every admin page except the login screen.
 *
 * The guard lives here rather than in a middleware because middleware runs on the Edge
 * runtime, which cannot reach Postgres. Every server action re-checks the session anyway —
 * a layout guard protects the view, not the mutation.
 */
export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">Site admin</div>
        <AdminNav role={user.role} />
        <div className="mt-auto px-4 pt-4">
          <div style={{ fontSize: "0.8rem", color: "#8fa1ad" }}>Signed in as</div>
          <div style={{ fontSize: "0.9rem", marginBottom: 10 }}>{user.name}</div>
          <SignOutButton />
          <Link
            href="/"
            className="d-block mt-3"
            style={{ fontSize: "0.85rem", padding: 0, borderLeft: 0 }}
          >
            View site →
          </Link>
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
