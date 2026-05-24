import "server-only";
import { prisma } from "@/lib/prisma";

export type ProductCategory = "main" | "circular";

export async function listProducts(opts?: {
  category?: ProductCategory;
  activeOnly?: boolean;
  limit?: number;
}) {
  return prisma.product.findMany({
    where: {
      ...(opts?.activeOnly !== false && { isActive: true }),
      ...(opts?.category && { category: opts.category }),
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: opts?.limit,
  });
}

export async function listFeaturedProducts(limit = 3) {
  return prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }],
    take: limit,
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}
