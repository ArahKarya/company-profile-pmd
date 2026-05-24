import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const member = await prisma.teamMember.create({
    data: {
      name: body.name,
      roleId: body.roleId,
      roleEn: body.roleEn,
      photoUrl: body.photoUrl ?? null,
      sortOrder: body.sortOrder ?? 0,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json({ data: member }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = await request.json();
  const member = await prisma.teamMember.update({
    where: { id },
    data: {
      name: body.name,
      roleId: body.roleId,
      roleEn: body.roleEn,
      photoUrl: body.photoUrl,
      sortOrder: body.sortOrder,
      isActive: body.isActive,
    },
  });
  return NextResponse.json({ data: member });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
