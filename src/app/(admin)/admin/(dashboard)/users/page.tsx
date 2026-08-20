import { requireAdmin } from "@/server/auth";
import { requireDb } from "@/server/db";
import { UsersManager } from "./UsersManager";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const actor = await requireAdmin();
  const users = await requireDb().user.findMany({
    select: { id: true, email: true, name: true, role: true, lastLoginAt: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Users</h1>
          <p className="subtitle">
            Administrators manage accounts; editors can change content but not accounts.
          </p>
        </div>
      </div>

      <UsersManager
        actorId={actor.id}
        users={users.map((user) => ({
          ...user,
          lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
          createdAt: user.createdAt.toISOString(),
        }))}
      />
    </>
  );
}
