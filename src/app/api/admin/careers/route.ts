import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await prisma.career.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const career = await prisma.career.create({
    data: {
      titleId: body.titleId,
      titleEn: body.titleEn,
      descId: body.descId,
      descEn: body.descEn,
      location: body.location,
      type: body.type,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json({ data: career }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = await request.json();
  const career = await prisma.career.update({
    where: { id },
    data: {
      titleId: body.titleId,
      titleEn: body.titleEn,
      descId: body.descId,
      descEn: body.descEn,
      location: body.location,
      type: body.type,
      isActive: body.isActive,
    },
  });
  return NextResponse.json({ data: career });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.career.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
