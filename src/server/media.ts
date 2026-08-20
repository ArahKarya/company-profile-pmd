import "server-only";

import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import { prisma } from "./db";

/** Files that ship in `public/` and so never appear in the database-backed library. */
const BUNDLED_DIRS = ["images", "brand"] as const;

export const bundledImages = cache(async (): Promise<string[]> => {
  const found: string[] = [];
  for (const dir of BUNDLED_DIRS) {
    try {
      const entries = await readdir(join(process.cwd(), "public", dir), { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(entry.name)) {
          found.push(`/${dir}/${entry.name}`);
        }
      }
    } catch {
      // Directory may not exist in a trimmed deployment — skip it.
    }
  }
  return found.sort();
});

export const libraryImages = cache(
  async (): Promise<{ id: string; filename: string }[]> => {
    if (!prisma) return [];
    return prisma.mediaAsset.findMany({
      select: { id: true, filename: true },
      orderBy: { createdAt: "desc" },
    });
  },
);
