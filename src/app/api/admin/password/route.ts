import { z } from "zod";
import { hash, compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonError, withAuth, parseBody } from "@/lib/api";
import { auth } from "@/lib/auth";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z
      .string()
      .min(10, "Min 10 karakter")
      .regex(/[A-Z]/, "Harus mengandung huruf besar")
      .regex(/[a-z]/, "Harus mengandung huruf kecil")
      .regex(/[0-9]/, "Harus mengandung angka"),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Password baru harus berbeda dengan password lama",
    path: ["newPassword"],
  });

export const POST = withAuth(async (request) => {
  const session = await auth();
  if (!session?.user?.email) return jsonError("Unauthorized", 401);

  const parsed = await parseBody(request, passwordSchema);
  if (parsed.error) return parsed.error;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return jsonError("User not found", 404);

  const valid = await compare(parsed.data.currentPassword, user.password);
  if (!valid) return jsonError("Password lama salah", 400);

  const hashed = await hash(parsed.data.newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });

  return jsonOk({ updated: true });
});
