import { z } from "zod";

export const careerCreateSchema = z.object({
  titleId: z.string().trim().min(1).max(200),
  titleEn: z.string().trim().min(1).max(200),
  descId: z.string().trim().min(1).max(5000),
  descEn: z.string().trim().min(1).max(5000),
  location: z.string().trim().min(1).max(200),
  type: z.string().trim().min(1).max(100),
  isActive: z.boolean().default(true),
});

export const careerUpdateSchema = careerCreateSchema.partial();

export type CareerCreateInput = z.infer<typeof careerCreateSchema>;
