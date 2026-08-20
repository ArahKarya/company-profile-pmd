import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Prisma client, reused across hot reloads in development so `next dev` does not open a new
 * connection pool on every edit.
 *
 * `DATABASE_URL` is optional: without it the site serves the bundled default content and the
 * admin panel is disabled. Anything that needs the database goes through `requireDb()`.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function create(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

export const prisma: PrismaClient | null =
  globalForPrisma.prisma ?? create();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}

/** True when a database is configured, i.e. when the admin panel can run. */
export const hasDatabase = prisma !== null;

/** Prisma client, or a clear error explaining what is missing. */
export function requireDb(): PrismaClient {
  if (!prisma) {
    throw new Error(
      "DATABASE_URL is not set. The admin panel and database-backed content need a " +
        "Postgres connection — copy .env.example to .env and fill it in.",
    );
  }
  return prisma;
}
