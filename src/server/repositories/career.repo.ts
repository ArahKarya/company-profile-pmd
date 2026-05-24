import "server-only";
import { prisma } from "@/lib/prisma";

export async function listCareers(opts?: { activeOnly?: boolean }) {
  return prisma.career.findMany({
    where: { ...(opts?.activeOnly !== false && { isActive: true }) },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCareerById(id: string) {
  return prisma.career.findUnique({ where: { id } });
}
