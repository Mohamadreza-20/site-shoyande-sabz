"use client";

import { useMemo } from "react";
import { CheckCircle2, Clock, ShoppingBag, XCircle } from "lucide-react";
import type { Order } from "@/features/orders/types";
import { useOrders } from "@/features/orders/hooks";
import StatsCardsGrid from "@/components/ui/StatsCardsGrid";

export default function OrdersStats({
  initialOrders,
  fetchedAt,
}: {
  initialOrders: Order[];
  fetchedAt?: number;
}) {
  const { data: orders = initialOrders } = useOrders(initialOrders, fetchedAt);

  const counts = useMemo(
    () => ({
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    }),
    [orders]
  );
  const { processing, shipped, delivered, cancelled } = counts;

  const stats = [
    { icon: ShoppingBag, label: "Total orders", value: orders.length.toLocaleString("en-US") },
    { icon: Clock, label: "Processing", value: processing.toLocaleString("en-US") },
    {
      icon: CheckCircle2,
      label: "Shipped or delivered",
      value: (shipped + delivered).toLocaleString("en-US"),
    },
    { icon: XCircle, label: "Cancelled", value: cancelled.toLocaleString("en-US") },
  ];

  return <StatsCardsGrid stats={stats} />;
}
