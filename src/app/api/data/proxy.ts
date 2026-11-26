import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { API_BASE } from "@/lib/http";
import { authorizeDataRequest, type DataSession } from "./authorization";

function stripPasswords<T>(payload: T): T {
  if (Array.isArray(payload)) return payload.map(stripPasswords) as unknown as T;
  if (payload && typeof payload === "object" && "password" in payload) {
    const { password: _password, ...rest } = payload as Record<string, unknown>;
    void _password;
    return rest as T;
  }
  return payload;
}

function errorMessage(status: number): string {
  if (status === 401) return "Please sign in.";
  if (status === 403) return "You are not authorized.";
  if (status === 404) return "The requested resource was not found.";
  return `The request failed with server error (${status}).`;
}

async function readBody(request: NextRequest): Promise<unknown> {
  if (!["POST", "PATCH", "PUT"].includes(request.method)) return undefined;
  return request.json().catch(() => undefined);
}

function hasUnsafeSegment(path: string[]): boolean {
  return path.some(
    (segment) => !segment || segment === "." || segment === ".." || /[/\\?#%]/.test(segment)
  );
}

export async function proxyDataRequest(request: NextRequest, path: string[]) {
  if (hasUnsafeSegment(path)) {
    return NextResponse.json({ error: errorMessage(404) }, { status: 404 });
  }
  const rawSession = (await auth()) as DataSession;
  const session = rawSession?.user?.active ? rawSession : null;
  const body = await readBody(request);
  const decision = authorizeDataRequest(request, path, session, body);

  if (!decision.allowed) {
    return NextResponse.json({ error: errorMessage(decision.status) }, { status: decision.status });
  }

  const query = decision.searchParams.toString();
  const upstreamUrl = `${API_BASE}/${path.map(encodeURIComponent).join("/")}${query ? `?${query}` : ""}`;
  const hasBody = body !== undefined;

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      method: request.method,
      headers: hasBody ? { "Content-Type": "application/json" } : undefined,
      body: hasBody ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: 'The API server is unavailable. Make sure "npm run api" is running.' },
      { status: 503 }
    );
  }

  if (!upstreamRes.ok) {
    if (request.method === "DELETE") {
      if (upstreamRes.status === 404) {
        return NextResponse.json(true, { status: 200 });
      }

      if (upstreamRes.status >= 500) {
        try {
          const verifyRes = await fetch(upstreamUrl, { cache: "no-store" });
          if (verifyRes.status === 404) {
            return NextResponse.json(true, { status: 200 });
          }
        } catch {}
      }
    }

    return NextResponse.json(
      { error: errorMessage(upstreamRes.status) },
      { status: upstreamRes.status }
    );
  }

  if (request.method === "DELETE") return NextResponse.json(true, { status: 200 });

  const data = await upstreamRes.json();
  const payload = path[0] === "customers" ? stripPasswords(data) : data;
  const response = NextResponse.json(payload);
  const totalCount = upstreamRes.headers.get("X-Total-Count");
  if (totalCount) response.headers.set("X-Total-Count", totalCount);
  return response;
}
