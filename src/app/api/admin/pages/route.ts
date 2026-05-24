import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: { sections: { orderBy: { sortOrder: "asc" } } },
    });
    return NextResponse.json({ data: page });
  }

  const pages = await prisma.page.findMany({
    include: { sections: { orderBy: { sortOrder: "asc" } } },
  });
  return NextResponse.json({ data: pages });
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, sections } = await request.json();

  if (!slug || !sections) {
    return NextResponse.json({ error: "Missing slug or sections" }, { status: 400 });
  }

  const page = await prisma.page.upsert({
    where: { slug },
    update: {},
    create: { slug },
  });

  for (const section of sections) {
    await prisma.pageSection.upsert({
      where: { pageId_key: { pageId: page.id, key: section.key } },
      update: {
        titleId: section.titleId ?? "",
        titleEn: section.titleEn ?? "",
        contentId: section.contentId ?? "",
        contentEn: section.contentEn ?? "",
        imageUrl: section.imageUrl ?? null,
        sortOrder: section.sortOrder ?? 0,
        isActive: section.isActive ?? true,
        metadata: section.metadata ?? null,
      },
      create: {
        pageId: page.id,
        key: section.key,
        titleId: section.titleId ?? "",
        titleEn: section.titleEn ?? "",
        contentId: section.contentId ?? "",
        contentEn: section.contentEn ?? "",
        imageUrl: section.imageUrl ?? null,
        sortOrder: section.sortOrder ?? 0,
        isActive: section.isActive ?? true,
        metadata: section.metadata ?? null,
      },
    });
  }

  const updated = await prisma.page.findUnique({
    where: { slug },
    include: { sections: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json({ data: updated });
}
