"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ContactMessage } from "../types";
import { useMessages } from "../hooks";

const PAGE_SIZE = 10;

export function useMessagesPanel(initialMessages: ContactMessage[], fetchedAt?: number) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: messages = initialMessages, isError, refetch } = useMessages(initialMessages, fetchedAt);
  const sorted = useMemo(() => [...messages].sort((a, b) => {
    const left = new Date(b.date).getTime();
    const right = new Date(a.date).getTime();
    return (Number.isNaN(left) ? 0 : left) - (Number.isNaN(right) ? 0 : right);
  }), [messages]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const requestedPage = Number(searchParams.get("page"));
  const page = Number.isFinite(requestedPage) && requestedPage >= 1 ? Math.min(requestedPage, totalPages) : 1;
  const paginated = useMemo(() => sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [sorted, page]);
  const [selectedId, setSelectedId] = useState<string | null>(paginated[0]?.id ?? null);

  useEffect(() => {
    if (requestedPage <= totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    if (totalPages > 1) params.set("page", String(totalPages)); else params.delete("page");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, requestedPage, router, searchParams, totalPages]);

  useEffect(() => {
    if (paginated.length === 0) setSelectedId(null);
    else if (!selectedId || !paginated.some((message) => message.id === selectedId)) setSelectedId(paginated[0].id);
  }, [paginated, selectedId]);

  const setPage = useCallback((nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage > 1) params.set("page", String(nextPage)); else params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return { sorted, paginated, totalPages, page, isError, refetch, selectedId, setSelectedId, selectedMessage: paginated.find((message) => message.id === selectedId) ?? null, setPage };
}
