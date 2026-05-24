import { prisma } from "@/lib/prisma";
import { jsonOk, withAuth, parseBody } from "@/lib/api";
import { careerCreateSchema } from "@/server/validators/career.schema";

export const GET = withAuth(async () => {
  const careers = await prisma.career.findMany({
    orderBy: { createdAt: "desc" },
  });
  return jsonOk(careers);
});

export const POST = withAuth(async (request) => {
  const parsed = await parseBody(request, careerCreateSchema);
  if (parsed.error) return parsed.error;
  const created = await prisma.career.create({ data: parsed.data });
  return jsonOk(created, 201);
});
