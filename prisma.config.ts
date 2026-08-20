import { defineConfig, env } from "prisma/config";

// Prisma 7 does not read .env by itself. Node's own loader does the job with no dependency;
// it throws if the file is absent, which is fine — the variable may come from the real
// environment instead.
try {
  process.loadEnvFile(".env");
} catch {
  // no .env file — fall back to whatever is already exported
}

/**
 * Prisma 7 keeps the connection string out of schema.prisma; the CLI reads it from here.
 * The runtime driver adapter is constructed in src/server/db.ts, not in this file.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: { url: env("DATABASE_URL") },
  migrations: { path: "prisma/migrations", seed: "npx tsx prisma/seed.ts" },
});
