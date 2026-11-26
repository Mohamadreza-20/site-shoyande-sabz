import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { authorizeProtectedRoute } from "@/lib/security/route-authorization";

export const proxy = auth((request) => {
  return authorizeProtectedRoute(request, request.auth) ?? NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
};
