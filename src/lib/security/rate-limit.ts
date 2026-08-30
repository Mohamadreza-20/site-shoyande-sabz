import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getClientId } from "./client-id";

const WINDOW_SECONDS = 60;
const LIMITS: Record<string, number> = {
  "/api/contact": 5,
  "/api/auth/signup": 3,
  "/api/auth/callback/credentials": 8,
};

type LimitResult = { success: boolean; retryAfterSeconds: number };

type MemoryEntry = { count: number; resetAt: number };
const memoryStore = new Map<string, MemoryEntry>();
const upstashLimiters = new Map<number, Ratelimit>();

function checkMemoryLimit(key: string, limit: number): LimitResult {
  const now = Date.now();
  const resetAt = now + WINDOW_SECONDS * 1000;
  const entry = memoryStore.get(key);

  if (!entry || entry.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt });
    return { success: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= limit) {
    return {
      success: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { success: true, retryAfterSeconds: 0 };
}

function getUpstashLimiter(limit: number): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const cached = upstashLimiters.get(limit);
  if (cached) return cached;

  const limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limit, `${WINDOW_SECONDS} s`),
    analytics: true,
    prefix: "shooyande-sabz:ratelimit",
  });

  upstashLimiters.set(limit, limiter);
  return limiter;
}

export async function applyRateLimit(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  const limit = LIMITS[pathname];
  if (!limit) return null;

  const key = `${pathname}:${getClientId(request)}`;
  const upstash = getUpstashLimiter(limit);

  let result: LimitResult;
  if (upstash) {
    const { success, reset } = await upstash.limit(key);
    result = {
      success,
      retryAfterSeconds: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
    };
  } else {
    result = checkMemoryLimit(key, limit);
  }

  if (result.success) return null;

  return NextResponse.json(
    { error: "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً کمی صبر کنید و دوباره تلاش کنید." },
    {
      status: 429,
      headers: { "Retry-After": String(result.retryAfterSeconds) },
    }
  );
}
