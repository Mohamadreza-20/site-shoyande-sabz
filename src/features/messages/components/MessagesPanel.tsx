"use client";

import { StaleDataNotice } from "@/components/ui/StaleDataNotice";
import type { ContactMessage } from "@/features/messages/types";
import { useMessagesPanel } from "../hooks/useMessagesPanel";
import MessagesEmptyState from "./parts/MessagesEmptyState";
import MessagesListPane from "./parts/MessagesListPane";
import MessagesDetailPane from "./parts/MessagesDetailPane";

export default function MessagesPanel({ initialMessages, fetchedAt }: { initialMessages: ContactMessage[]; fetchedAt?: number }) {
  const messages = useMessagesPanel(initialMessages, fetchedAt);
  if (messages.sorted.length === 0) return <MessagesEmptyState />;
  return <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-start">{messages.isError && <div className="w-full"><StaleDataNotice onRetry={() => messages.refetch()} /></div>}<MessagesListPane messages={messages.paginated} selectedId={messages.selectedId} onSelect={messages.setSelectedId} page={messages.page} totalPages={messages.totalPages} onPageChange={messages.setPage} /><MessagesDetailPane message={messages.selectedMessage} /></div>;
}
