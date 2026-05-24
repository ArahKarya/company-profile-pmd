import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }
  return response;
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth gate for admin routes (excluding login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = await auth();
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }
  }

  // Skip locale routing for admin, api, and Next.js internals
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/dev") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return applySecurityHeaders(NextResponse.next());
  }

  // Public routes — run next-intl locale detection / redirect
  const intlResponse = intlMiddleware(request);
  return applySecurityHeaders(intlResponse);
}

export const config = {
  // Match all routes except static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|fonts).*)"],
};
