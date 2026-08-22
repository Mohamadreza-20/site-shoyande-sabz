import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STAFF_ROLES = new Set(["manager", "support"]);

type SessionLike = {
  user?: {
    active?: boolean;
    role?: string | null;
  } | null;
} | null;

export function authorizeProtectedRoute(
  request: NextRequest,
  session: SessionLike
): NextResponse | null {
  const { pathname } = request.nextUrl;
  const activeSession = session?.user?.active ? session : null;
  const role = activeSession?.user?.role;

  if (pathname.startsWith("/dashboard")) {
    if (!activeSession) return redirectToAuth(request);
    if (!STAFF_ROLES.has(role ?? "")) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  if (pathname.startsWith("/account")) {
    if (!activeSession) return redirectToAuth(request);
    if (role !== "customer") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return null;
}

function redirectToAuth(request: NextRequest): NextResponse {
  const url = new URL("/auth", request.url);
  url.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}
