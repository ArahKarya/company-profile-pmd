import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@/server/auth";
import { hasDatabase } from "@/server/db";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

/** Never prerender: the answer depends on the request's session cookie. */
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (!hasDatabase) {
    return (
      <div className="admin-login">
        <div className="admin-card">
          <h2>Database not configured</h2>
          <p className="hint">
            The admin panel needs a Postgres connection. Copy <code>.env.example</code> to{" "}
            <code>.env</code>, set <code>DATABASE_URL</code>, then run{" "}
            <code>npx prisma migrate deploy</code> and <code>npm run db:seed</code>.
          </p>
        </div>
      </div>
    );
  }

  if (await currentUser()) redirect("/admin");

  return (
    <div className="admin-login">
      <LoginForm />
    </div>
  );
}
