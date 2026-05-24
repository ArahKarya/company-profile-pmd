import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, withAuth, parseBody } from "@/lib/api";
import { careerUpdateSchema } from "@/server/validators/career.schema";

interface Ctx {
  params: Promise<{ id: string }>;
}

export const PATCH = withAuth<Ctx>(async (request, { params }) => {
  const { id } = await params;
  const parsed = await parseBody(request, careerUpdateSchema);
  if (parsed.error) return parsed.error;
  try {
    const updated = await prisma.career.update({ where: { id }, data: parsed.data });
    return jsonOk(updated);
  } catch {
    return jsonError("Lowongan tidak ditemukan", 404);
  }
});

export const DELETE = withAuth<Ctx>(async (_request, { params }) => {
  const { id } = await params;
  try {
    await prisma.career.delete({ where: { id } });
    return jsonOk({ id });
  } catch {
    return jsonError("Lowongan tidak ditemukan", 404);
  }
});
