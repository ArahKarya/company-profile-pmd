import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSettings, updateSetting } from "@/lib/settings";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSettings();
  return NextResponse.json({ data: settings });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const entries = Object.entries(body) as [string, string][];

  await Promise.all(entries.map(([key, value]) => updateSetting(key, value)));

  return NextResponse.json({ success: true });
}
