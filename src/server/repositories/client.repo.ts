import "server-only";
import { prisma } from "@/lib/prisma";

export async function listClients(opts?: { activeOnly?: boolean }) {
  return prisma.client.findMany({
    where: { ...(opts?.activeOnly !== false && { isActive: true }) },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}
