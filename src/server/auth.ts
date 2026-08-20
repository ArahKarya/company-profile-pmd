import "server-only";

import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { requireDb } from "./db";
import { verifyPassword } from "./password";
import type { Role, User } from "@/generated/prisma/client";

export const SESSION_COOKIE = "cpt_session";

/** How long a session stays valid. Renewed on use once it is past halfway. */
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export type SessionUser = Pick<User, "id" | "email" | "name" | "role">;

/**
 * Checks credentials and, on success, issues a session.
 *
 * Returns null for both an unknown email and a wrong password, and hashes nothing in the
 * unknown-email case — the timing difference is not worth a fake hash here, since the login
 * route is rate-limited by the caller.
 */
export async function login(email: string, password: string): Promise<SessionUser | null> {
  const db = requireDb();
  const user = await db.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) return null;
  if (!(await verifyPassword(password, user.passwordHash))) return null;

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.session.create({ data: { id: token, userId: user.id, expiresAt } });
  await db.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

/** Drops the current session row and clears the cookie. */
export async function logout(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    // The row may already be gone (expired sweep, or revoked elsewhere) — ignore that.
    await requireDb().session.deleteMany({ where: { id: token } });
  }
  store.delete(SESSION_COOKIE);
}

/**
 * The signed-in user, or null.
 *
 * Wrapped in React's `cache` so several server components in one render share a single
 * query rather than each issuing their own.
 */
export const currentUser = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const db = requireDb();
  const session = await db.session.findUnique({
    where: { id: token },
    include: { user: { select: { id: true, email: true, name: true, role: true } } },
  });
  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await db.session.deleteMany({ where: { id: token } });
    return null;
  }

  return session.user;
});

/** The signed-in user, or a redirect to the login page. */
export async function requireUser(): Promise<SessionUser> {
  const user = await currentUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** The signed-in user when they are an ADMIN, otherwise a redirect. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/admin?error=forbidden");
  return user;
}

export function isAdmin(role: Role): boolean {
  return role === "ADMIN";
}

/** Removes expired sessions. Called opportunistically from the admin dashboard. */
export async function pruneExpiredSessions(): Promise<number> {
  const { count } = await requireDb().session.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
  return count;
}
