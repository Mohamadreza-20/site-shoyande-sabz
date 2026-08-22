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

  const counts = useMemo(() => ({
    pending: messages.filter((m) => m.status === "pending").length,
    answered: messages.filter((m) => m.status === "answered").length,
  }), [messages]);
  const { pending, answered } = counts;

  const stats = [
    { icon: MessageSquare, label: "کل پیام‌ها", value: messages.length.toLocaleString("fa-IR") },
    { icon: Clock, label: "در انتظار پاسخ", value: pending.toLocaleString("fa-IR") },
    { icon: CheckCircle2, label: "پاسخ داده شده", value: answered.toLocaleString("fa-IR") },
  ];

  return <StatsCardsGrid stats={stats} columns={3} />;
}
