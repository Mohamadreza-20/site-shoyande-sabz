"use client";

import { CalendarClock, CheckCircle2, Percent, XCircle } from "lucide-react";
import type { Discount } from "@/features/discounts/types";
import { useDiscounts } from "@/features/discounts/hooks";
import StatsCardsGrid from "@/components/ui/StatsCardsGrid";

export default function DiscountsStats({
  initialDiscounts,
  fetchedAt,
}: {
  initialDiscounts: Discount[];
  fetchedAt?: number;
}) {
  const { data: discounts = initialDiscounts } = useDiscounts(initialDiscounts, fetchedAt);

  const active = discounts.filter((d) => d.status === "active").length;
  const scheduled = discounts.filter((d) => d.status === "scheduled").length;
  const expired = discounts.filter((d) => d.status === "expired").length;

  const stats = [
    { icon: Percent, label: "کل کدهای تخفیف", value: discounts.length.toLocaleString("fa-IR") },
    { icon: CheckCircle2, label: "فعال", value: active.toLocaleString("fa-IR") },
    { icon: CalendarClock, label: "زمان‌بندی‌شده", value: scheduled.toLocaleString("fa-IR") },
    { icon: XCircle, label: "منقضی‌شده", value: expired.toLocaleString("fa-IR") },
  ];

  return <StatsCardsGrid stats={stats} />;
}
