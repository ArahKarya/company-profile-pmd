import { prisma } from "@/lib/prisma";
import { jsonOk, withAuth, parseBody } from "@/lib/api";
import { productCreateSchema } from "@/server/validators/product.schema";

export const GET = withAuth(async () => {
  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return jsonOk(products);
});

export const POST = withAuth(async (request) => {
  const parsed = await parseBody(request, productCreateSchema);
  if (parsed.error) return parsed.error;
  const created = await prisma.product.create({ data: parsed.data });
  return jsonOk(created, 201);
});
