import { prisma } from "@/lib/prisma";
import { jsonOk, withAuth, parseBody } from "@/lib/api";
import { teamCreateSchema } from "@/server/validators/team.schema";

export const GET = withAuth(async () => {
  const members = await prisma.teamMember.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return jsonOk(members);
});

export const POST = withAuth(async (request) => {
  const parsed = await parseBody(request, teamCreateSchema);
  if (parsed.error) return parsed.error;
  const created = await prisma.teamMember.create({ data: parsed.data });
  return jsonOk(created, 201);
});
