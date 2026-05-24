import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { jsonOk, jsonError, withAuth } from "@/lib/api";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;
const UPLOAD_DIR =
  process.env.UPLOAD_DIR ?? path.join(process.cwd(), "public", "uploads");
const PUBLIC_PREFIX = "/uploads";

export const POST = withAuth(async (request) => {
  const formData = await request.formData().catch(() => null);
  if (!formData) return jsonError("Invalid form data", 400);

  const file = formData.get("file");
  if (!(file instanceof File)) return jsonError("No file provided", 400);

  if (file.size > MAX_BYTES) {
    return jsonError(`File too large (max ${MAX_BYTES / 1024 / 1024}MB)`, 413);
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return jsonError("Unsupported file type", 415);
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await mkdir(UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return jsonOk({ url: `${PUBLIC_PREFIX}/${filename}` }, 201);
});
