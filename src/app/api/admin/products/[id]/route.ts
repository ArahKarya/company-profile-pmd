import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, withAuth, parseBody } from "@/lib/api";
import { productUpdateSchema } from "@/server/validators/product.schema";

interface Ctx {
  params: Promise<{ id: string }>;
}

export const PATCH = withAuth<Ctx>(async (request, { params }) => {
  const { id } = await params;
  const parsed = await parseBody(request, productUpdateSchema);
  if (parsed.error) return parsed.error;
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: parsed.data,
    });
    return jsonOk(updated);
  } catch {
    return jsonError("Produk tidak ditemukan", 404);
  }
});

export const DELETE = withAuth<Ctx>(async (_request, { params }) => {
  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    return jsonOk({ id });
  } catch {
    return jsonError("Produk tidak ditemukan", 404);
  }
});
