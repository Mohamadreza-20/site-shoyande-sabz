import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { applyRateLimit } from "@/lib/security/rate-limit";
import { authorizeProtectedRoute } from "@/lib/security/route-authorization";

export const proxy = auth(async (request) => {
  const rateLimited = await applyRateLimit(request);
  if (rateLimited) return rateLimited;

  return authorizeProtectedRoute(request, request.auth) ?? NextResponse.next();
});

export const config = {
  matcher: [
    "/api/contact",
    "/api/auth/signup",
    "/api/auth/callback/credentials",
    "/dashboard/:path*",
    "/account/:path*",
  ],
};
