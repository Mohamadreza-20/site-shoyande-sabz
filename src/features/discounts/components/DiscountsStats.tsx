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
    { icon: Percent, label: "Total codes", value: discounts.length.toLocaleString("en-US") },
    { icon: CheckCircle2, label: "Active", value: active.toLocaleString("en-US") },
    { icon: CalendarClock, label: "Scheduled", value: scheduled.toLocaleString("en-US") },
    { icon: XCircle, label: "Expired", value: expired.toLocaleString("en-US") },
  ];

  return <StatsCardsGrid stats={stats} />;
}
