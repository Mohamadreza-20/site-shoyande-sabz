import { apiFetch, apiMutate, createApiError, createNetworkError } from "@/lib/http";
import type { ContactMessage } from "./types";

export function getMessages() {
  return apiFetch<ContactMessage[]>("/messages");
}

export function getMessagesByUserId(userId: string) {
  return apiFetch<ContactMessage[]>(`/messages?userId=${encodeURIComponent(userId)}`);
}

export async function createMessage(input: {
  name: string;
  email: string;
  userId?: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  let res: Response;
  try {
    res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch (error) {
    throw createNetworkError("/api/contact", error);
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw createApiError(
      data?.error ?? "ارسال پیام با خطا مواجه شد.",
      res.status,
      "/api/contact"
    );
  }
  return (await res.json()) as ContactMessage;
}

export function replyToMessage(id: string, reply: string) {
  return apiMutate<ContactMessage>(`/messages/${id}`, "PATCH", {
    reply,
    status: "answered",
    repliedAt: new Date().toISOString(),
  });
}

export type { ContactMessage };
