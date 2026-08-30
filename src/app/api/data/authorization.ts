import type { NextRequest } from "next/server";

export type Role = "customer" | "manager" | "support";
export type DataSession = { user?: { id: string; role: Role; active: boolean } } | null;

const STAFF_ROLES: readonly Role[] = ["manager", "support"];
const PUBLIC_GET_RESOURCES = new Set(["categories", "reviews"]);
const STAFF_ONLY_RESOURCES = new Set(["discounts", "analytics", "overview", "articles"]);
const SCOPED_RESOURCES: Record<string, string> = { orders: "customerId" };
const CUSTOMER_SELF_EDITABLE_FIELDS = new Set(["wishlist", "name", "email", "phone"]);
const RATING_RECALC_FIELDS = new Set(["ratingValue", "rating", "reviewCount"]);

export function isStaff(session: DataSession): boolean {
  return !!session?.user?.active && STAFF_ROLES.includes(session.user.role);
}

function getObjectKeys(body: unknown): string[] {
  return body && typeof body === "object" ? Object.keys(body) : [];
}

function isOnlyAllowedFields(body: unknown, fields: Set<string>): boolean {
  const keys = getObjectKeys(body);
  return keys.length > 0 && keys.every((key) => fields.has(key));
}

export function authorizeDataRequest(
  request: NextRequest,
  segments: string[],
  session: DataSession,
  body: unknown
): { allowed: true; searchParams: URLSearchParams } | { allowed: false; status: number } {
  const method = request.method;
  const resource = segments[0];
  const isCollectionCall = segments.length === 1;
  const searchParams = new URLSearchParams(request.nextUrl.searchParams);

  if (!resource) return { allowed: false, status: 404 };

  if (resource === "customers") {
    if (method === "GET") return isStaff(session) ? { allowed: true, searchParams } : { allowed: false, status: session ? 403 : 401 };
    if (method === "PATCH" && segments.length === 2) {
      if (isStaff(session)) return { allowed: true, searchParams };
      const isSelf = session?.user?.id === segments[1];
      if (isSelf && isOnlyAllowedFields(body, CUSTOMER_SELF_EDITABLE_FIELDS)) return { allowed: true, searchParams };
    }
    return { allowed: false, status: 403 };
  }

  if (resource === "products") {
    if (method === "GET") return { allowed: true, searchParams };
    if (isStaff(session)) return { allowed: true, searchParams };
    if (method === "PATCH" && segments.length === 2 && isOnlyAllowedFields(body, RATING_RECALC_FIELDS)) {
      return { allowed: true, searchParams };
    }
    return { allowed: false, status: 403 };
  }

  if (resource === "messages") {
    if (method === "PATCH" && segments.length === 2) {
      return isStaff(session) ? { allowed: true, searchParams } : { allowed: false, status: session ? 403 : 401 };
    }
    if (method !== "GET") return { allowed: false, status: 403 };
    if (isCollectionCall) {
      if (isStaff(session)) return { allowed: true, searchParams };
      if (!session?.user) return { allowed: false, status: 401 };
      searchParams.set("userId", session.user.id);
      return { allowed: true, searchParams };
    }
    return isStaff(session) ? { allowed: true, searchParams } : { allowed: false, status: 403 };
  }

  if (resource in SCOPED_RESOURCES) {
    if (method !== "GET") return { allowed: false, status: 403 };
    if (!isCollectionCall) return isStaff(session) ? { allowed: true, searchParams } : { allowed: false, status: 403 };
    if (isStaff(session)) return { allowed: true, searchParams };
    if (!session?.user) return { allowed: false, status: 401 };
    searchParams.set(SCOPED_RESOURCES[resource], session.user.id);
    return { allowed: true, searchParams };
  }

  if (STAFF_ONLY_RESOURCES.has(resource)) {
    if (resource === "discounts" && method === "GET") {
      return { allowed: true, searchParams };
    }
    return isStaff(session) ? { allowed: true, searchParams } : { allowed: false, status: session ? 403 : 401 };
  }

  if (PUBLIC_GET_RESOURCES.has(resource)) {
    if (method === "GET" || (resource === "reviews" && method === "POST")) return { allowed: true, searchParams };
    return isStaff(session) ? { allowed: true, searchParams } : { allowed: false, status: session ? 403 : 401 };
  }

  return { allowed: false, status: 404 };
}
