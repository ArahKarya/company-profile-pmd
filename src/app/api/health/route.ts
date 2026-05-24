import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface HealthStatus {
  status: "ok" | "degraded";
  uptime: number;
  timestamp: string;
  checks: {
    database: "ok" | "fail";
  };
}

const startTime = Date.now();

export async function GET() {
  const checks: HealthStatus["checks"] = { database: "ok" };
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    checks.database = "fail";
  }

  const status: HealthStatus["status"] =
    checks.database === "ok" ? "ok" : "degraded";

  const body: HealthStatus = {
    status,
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    checks,
  };

  return NextResponse.json(body, {
    status: status === "ok" ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
