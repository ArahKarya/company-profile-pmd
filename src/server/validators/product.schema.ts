import { z } from "zod";

export const productCreateSchema = z.object({
  nameId: z.string().trim().min(1).max(200),
  nameEn: z.string().trim().min(1).max(200),
  descId: z.string().trim().min(1).max(5000),
  descEn: z.string().trim().min(1).max(5000),
  imageUrl: z.string().trim().nullable().optional(),
  category: z.enum(["main", "circular"]),
  features: z.string().trim().nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const productUpdateSchema = productCreateSchema.partial();

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
