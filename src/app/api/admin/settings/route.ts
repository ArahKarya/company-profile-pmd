import { z } from "zod";
import { jsonOk, withAuth, parseBody } from "@/lib/api";
import { setSetting } from "@/server/repositories/settings.repo";

const settingsSchema = z.record(z.string(), z.string());

export const POST = withAuth(async (request) => {
  const parsed = await parseBody(request, settingsSchema);
  if (parsed.error) return parsed.error;
  for (const [key, value] of Object.entries(parsed.data)) {
    await setSetting(key, value);
  }
  return jsonOk({ updated: Object.keys(parsed.data).length });
});
