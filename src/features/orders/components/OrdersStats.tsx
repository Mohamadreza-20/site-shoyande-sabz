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

  const counts = useMemo(() => ({
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }), [orders]);
  const { processing, shipped, delivered, cancelled } = counts;

  const stats = [
    { icon: ShoppingBag, label: "کل سفارشات", value: orders.length.toLocaleString("fa-IR") },
    { icon: Clock, label: "در حال پردازش", value: processing.toLocaleString("fa-IR") },
    {
      icon: CheckCircle2,
      label: "ارسال یا تحویل شده",
      value: (shipped + delivered).toLocaleString("fa-IR"),
    },
    { icon: XCircle, label: "لغو شده", value: cancelled.toLocaleString("fa-IR") },
  ];

  return <StatsCardsGrid stats={stats} />;
}
