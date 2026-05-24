import { prisma } from "@/lib/prisma";
import { jsonOk, withAuth, parseBody } from "@/lib/api";
import { clientCreateSchema } from "@/server/validators/client.schema";

export const GET = withAuth(async () => {
  const clients = await prisma.client.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return jsonOk(clients);
});

export const POST = withAuth(async (request) => {
  const parsed = await parseBody(request, clientCreateSchema);
  if (parsed.error) return parsed.error;
  const created = await prisma.client.create({ data: parsed.data });
  return jsonOk(created, 201);
});
