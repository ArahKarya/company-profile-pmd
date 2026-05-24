import "server-only";
import { prisma } from "@/lib/prisma";

export async function listTeamMembers(opts?: { activeOnly?: boolean }) {
  return prisma.teamMember.findMany({
    where: { ...(opts?.activeOnly !== false && { isActive: true }) },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}
