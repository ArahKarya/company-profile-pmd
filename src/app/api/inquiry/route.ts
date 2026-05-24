import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(200).optional().default(""),
  email: z.email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(10).max(2000),
  to: z.email().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, company, email, phone, message } = parsed.data;

  // TODO Fase 7: integrate email service (Resend/SES/SMTP) to send
  // notification to info@panganmasadepan.com. For now log only.
  console.info("[inquiry] received", {
    name,
    company,
    email,
    phone,
    messageLength: message.length,
  });

  return NextResponse.json({ ok: true });
}
