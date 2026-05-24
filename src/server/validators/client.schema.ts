import { z } from "zod";

export const clientCreateSchema = z.object({
  name: z.string().trim().min(1).max(200),
  logoUrl: z.string().trim().nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const clientUpdateSchema = clientCreateSchema.partial();

export type ClientCreateInput = z.infer<typeof clientCreateSchema>;
