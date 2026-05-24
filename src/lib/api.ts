import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { auth } from "@/lib/auth";

export interface ApiOk<T> {
  ok: true;
  data: T;
}

export interface ApiErr {
  ok: false;
  error: string;
  details?: unknown;
}

export function jsonOk<T>(data: T, status = 200): NextResponse<ApiOk<T>> {
  return NextResponse.json({ ok: true, data }, { status });
}

export function jsonError(
  error: string,
  status = 400,
  details?: unknown
): NextResponse<ApiErr> {
  return NextResponse.json({ ok: false, error, details }, { status });
}

type RouteHandler<TContext = unknown> = (
  request: Request,
  ctx: TContext
) => Promise<NextResponse> | NextResponse;

/**
 * Wrap an API route handler with session check. Returns 401 if not logged in.
 * Logged-in session is passed via second arg of handler via closure if needed.
 */
export function withAuth<TContext = unknown>(
  handler: RouteHandler<TContext>
): RouteHandler<TContext> {
  return async (request, ctx) => {
    const session = await auth();
    if (!session?.user) {
      return jsonError("Unauthorized", 401);
    }
    return handler(request, ctx);
  };
}

/**
 * Parse + validate JSON request body against a Zod schema.
 * Returns typed data on success, NextResponse error on failure.
 */
export async function parseBody<T>(
  request: Request,
  schema: ZodType<T>
): Promise<{ data: T; error?: undefined } | { error: NextResponse; data?: undefined }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { error: jsonError("Invalid JSON body", 400) };
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      error: jsonError("Validation failed", 400, parsed.error.issues),
    };
  }
  return { data: parsed.data };
}
