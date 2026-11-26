"use client";

import { useMemo, useState } from "react";
import { usePageParam } from "@/lib/hooks/usePageParam";
import type { ContactMessage } from "../types";
import { useMessages } from "../hooks";

const PAGE_SIZE = 10;

export function useMessagesPanel(initialMessages: ContactMessage[], fetchedAt?: number) {
  const {
    data: messages = initialMessages,
    isError,
    refetch,
  } = useMessages(initialMessages, fetchedAt);
  const sorted = useMemo(
    () =>
      [...messages].sort((a, b) => {
        const left = new Date(b.date).getTime();
        const right = new Date(a.date).getTime();
        return (Number.isNaN(left) ? 0 : left) - (Number.isNaN(right) ? 0 : right);
      }),
    [messages]
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const { page, setPage } = usePageParam(totalPages);
  const paginated = useMemo(
    () => sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [sorted, page]
  );
  const [chosenId, setSelectedId] = useState<string | null>(null);
  const selectedId = paginated.some((message) => message.id === chosenId)
    ? chosenId
    : (paginated[0]?.id ?? null);

  return {
    sorted,
    paginated,
    totalPages,
    page,
    isError,
    refetch,
    selectedId,
    setSelectedId,
    selectedMessage: paginated.find((message) => message.id === selectedId) ?? null,
    setPage,
  };
}
