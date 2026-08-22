import { unstable_rethrow } from "next/navigation";

export const API_BASE = process.env.API_URL || "http://localhost:4000";

const CLIENT_API_BASE = "/api/data";

export function resolveBase(): string {
  return typeof window === "undefined" ? API_BASE : CLIENT_API_BASE;
}

export interface ApiError extends Error {
  status: number;
  path: string;
}

export function createApiError(message: string, status: number, path: string): ApiError {
  const error = new Error(message) as ApiError;
  error.name = "ApiError";
  error.status = status;
  error.path = path;
  return error;
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof Error && (error as ApiError).name === "ApiError" && "status" in error;
}

export type NotFoundError = ApiError;

export function createNotFoundError(path: string): NotFoundError {
  const error = createApiError(`Not found: ${path}`, 404, path) as NotFoundError;
  error.name = "NotFoundError";
  return error;
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof Error && (error as NotFoundError).name === "NotFoundError";
}

export type ServerError = ApiError;

export function createServerError(status: number, path: string): ServerError {
  const error = createApiError(
    `API request to ${path} failed with status ${status}`,
    status,
    path
  ) as ServerError;
  error.name = "ServerError";
  return error;
}

export function isServerError(error: unknown): error is ServerError {
  return error instanceof Error && (error as ServerError).name === "ServerError";
}

export interface NetworkError extends Error {
  path: string;
  cause?: unknown;
}

export function createNetworkError(path: string, cause?: unknown): NetworkError {
  const error = new Error(`Could not reach ${path} — is "npm run api" running?`) as NetworkError;
  error.name = "NetworkError";
  error.path = path;
  error.cause = cause;
  return error;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof Error && (error as NetworkError).name === "NetworkError";
}

export function throwForResponse(res: Response, path: string): never {
  if (res.status === 404) throw createNotFoundError(path);
  throw createServerError(res.status, path);
}

export function apiErrorMessage(error: unknown): string {
  if (isNotFoundError(error)) return "آیتم موردنظر پیدا نشد.";
  if (isNetworkError(error)) {
    return "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.";
  }
  if (isApiError(error) && error.status === 429) {
    return "تعداد درخواست‌های شما زیاد بوده. لطفاً کمی صبر کنید و دوباره تلاش کنید.";
  }
  if (isApiError(error)) return `درخواست با خطای سرور (${error.status}) مواجه شد.`;
  if (error instanceof Error && error.message.trim()) return error.message;
  return "خطایی غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.";
}

export async function apiFetch<T>(
  path: string,
  options: { revalidate?: number | false; tags?: string[] } = {}
): Promise<T> {
  const { revalidate = false, tags } = options;
  const base = resolveBase();
  let res: Response;
  try {
    res = await fetch(
      `${base}${path}`,
      revalidate === false
        ? { cache: "no-store" }
        : { next: { revalidate, ...(tags ? { tags } : {}) } }
    );
  } catch (error) {
    unstable_rethrow(error);
    throw createNetworkError(path, error);
  }

  if (!res.ok) throwForResponse(res, path);
  return (await res.json()) as T;
}

export async function apiMutate<T>(
  path: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown
): Promise<T> {
  const base = resolveBase();
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    unstable_rethrow(error);
    throw createNetworkError(path, error);
  }

  if (!res.ok) {
    if (method === "DELETE" && res.status === 404) return true as unknown as T;
    throwForResponse(res, path);
  }
  if (method === "DELETE") return true as unknown as T;
  return (await res.json()) as T;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw createApiError(data?.error ?? "آپلود تصویر ناموفق بود.", res.status, "/api/upload");
  }
  const data = (await res.json()) as { url: string };
  return data.url;
}

export function generateId(prefix: string) {
  return `${prefix}${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const CATALOG_REVALIDATE_SECONDS = 120;

export const CACHE_TAGS = {
  products: "products",
  categories: "categories",
  blog: "blog",
} as const;
