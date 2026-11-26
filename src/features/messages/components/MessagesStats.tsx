"use client";

import { useMemo } from "react";
import { CheckCircle2, Clock, MessageSquare } from "lucide-react";
import type { ContactMessage } from "@/features/messages/types";
import { useMessages } from "@/features/messages/hooks";
import StatsCardsGrid from "@/components/ui/StatsCardsGrid";

export default function MessagesStats({
  initialMessages,
  fetchedAt,
}: {
  initialMessages: ContactMessage[];
  fetchedAt?: number;
}) {
  const { data: messages = initialMessages } = useMessages(initialMessages, fetchedAt);

  const counts = useMemo(
    () => ({
      pending: messages.filter((m) => m.status === "pending").length,
      answered: messages.filter((m) => m.status === "answered").length,
    }),
    [messages]
  );
  const { pending, answered } = counts;

  const stats = [
    {
      icon: MessageSquare,
      label: "Total messages",
      value: messages.length.toLocaleString("en-US"),
    },
    { icon: Clock, label: "Awaiting reply", value: pending.toLocaleString("en-US") },
    { icon: CheckCircle2, label: "Answered", value: answered.toLocaleString("en-US") },
  ];

  return <StatsCardsGrid stats={stats} columns={3} />;
}
