"use client";

import dynamic from "next/dynamic";
import type { Order } from "@/features/orders/types";
import type { Overview } from "@/features/dashboard/types";
import StatsRow from "./StatsRow";
import OrdersTable from "@/features/orders/components/OrdersTable";

const ChartSkeleton = () => (
  <div
    className="h-[280px] w-full animate-pulse rounded-[24px] border border-admin-line bg-white sm:h-[340px]"
    aria-hidden
  />
);

const SalesChart = dynamic(() => import("./SalesChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

export default function DashboardOverview({
  initialOverview,
  initialOrders,
}: {
  initialOverview: Overview;
  initialOrders: Order[];
}) {
  return (
    <>
      <StatsRow statCards={initialOverview.statCards} />
      <SalesChart weeklySales={initialOverview.weeklySales} />
      <OrdersTable orders={initialOrders} limit={8} />
    </>
  );
}
