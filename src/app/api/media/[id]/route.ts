import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

/**
 * Serves an uploaded image.
 *
 * Bytes live in Postgres so the site stays portable across hosts, including read-only
 * filesystems. The id changes whenever the bytes do — uploads never overwrite a row — so the
 * response can be cached indefinitely.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!prisma) return new NextResponse("Not found", { status: 404 });

  const { id } = await params;
  const asset = await prisma.mediaAsset.findUnique({
    where: { id },
    select: { bytes: true, mimeType: true },
  });
  if (!asset) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(Buffer.from(asset.bytes) as unknown as BodyInit, {
    headers: {
      "Content-Type": asset.mimeType,
      "Content-Length": String(asset.bytes.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
