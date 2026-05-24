import { z } from "zod";

export const teamCreateSchema = z.object({
  name: z.string().trim().min(1).max(200),
  roleId: z.string().trim().min(1).max(200),
  roleEn: z.string().trim().min(1).max(200),
  photoUrl: z.string().trim().nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const teamUpdateSchema = teamCreateSchema.partial();

export type TeamCreateInput = z.infer<typeof teamCreateSchema>;
