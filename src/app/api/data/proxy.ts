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
  if (status === 401) return "لطفاً وارد شوید.";
  if (status === 403) return "دسترسی مجاز نیست.";
  if (status === 404) return "منبع موردنظر پیدا نشد.";
  return `درخواست با خطای سرور (${status}) مواجه شد.`;
}

async function readBody(request: NextRequest): Promise<unknown> {
  if (!["POST", "PATCH", "PUT"].includes(request.method)) return undefined;
  return request.json().catch(() => undefined);
}

export async function proxyDataRequest(request: NextRequest, path: string[]) {
  const rawSession = (await auth()) as DataSession;
  const session = rawSession?.user?.active ? rawSession : null;
  const body = await readBody(request);
  const decision = authorizeDataRequest(request, path, session, body);

  if (!decision.allowed) {
    return NextResponse.json({ error: errorMessage(decision.status) }, { status: decision.status });
  }

  const query = decision.searchParams.toString();
  const upstreamUrl = `${API_BASE}/${path.join("/")}${query ? `?${query}` : ""}`;
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
      { error: 'سرور API در دسترس نیست. از اجرا بودن "npm run api" مطمئن شوید.' },
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
        } catch {
        }
      }
    }

    return NextResponse.json({ error: errorMessage(upstreamRes.status) }, { status: upstreamRes.status });
  }

  if (request.method === "DELETE") return NextResponse.json(true, { status: 200 });

  const data = await upstreamRes.json();
  const payload = path[0] === "customers" ? stripPasswords(data) : data;
  const response = NextResponse.json(payload);
  const totalCount = upstreamRes.headers.get("X-Total-Count");
  if (totalCount) response.headers.set("X-Total-Count", totalCount);
  return response;
}
