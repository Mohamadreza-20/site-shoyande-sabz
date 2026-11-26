"use client";

import dynamic from "next/dynamic";
import { BarChart3, ShoppingCart, TrendingUp, Users } from "lucide-react";
import type { Analytics } from "@/features/dashboard/types";
import type { Customer } from "@/features/customers/types";
import type { Order } from "@/features/orders/types";
import type { Product } from "@/features/products/types";
import TopProductsList from "@/features/products/components/admin/TopProductsList";

const ChartSkeleton = () => (
  <div
    className="h-[320px] w-full animate-pulse rounded-[24px] border border-admin-line bg-white"
    aria-hidden
  />
);

const RevenueChart = dynamic(() => import("./RevenueChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const TrafficSources = dynamic(() => import("./TrafficSources"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

export default function ReportsOverview({
  initialAnalytics,
  initialProducts,
  initialOrders,
  initialCustomers,
}: {
  initialAnalytics: Analytics;
  initialProducts: Product[];
  initialOrders: Order[];
  initialCustomers: Customer[];
}) {
  const { monthlyRevenue, trafficSources } = initialAnalytics;
  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.value, 0);
  const avgMonthly = monthlyRevenue.length ? Math.round(totalRevenue / monthlyRevenue.length) : 0;

  const stats = [
    {
      icon: TrendingUp,
      label: "Revenue, last 6 months",
      value: `$${totalRevenue.toLocaleString("en-US")}K`,
    },
    {
      icon: BarChart3,
      label: "Average monthly revenue",
      value: `$${avgMonthly.toLocaleString("en-US")}K`,
    },
    {
      icon: ShoppingCart,
      label: "Orders placed",
      value: `${initialOrders.length.toLocaleString("en-US")} orders`,
    },
    {
      icon: Users,
      label: "Registered customers",
      value: `${initialCustomers.length.toLocaleString("en-US")} people`,
    },
  ];

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-[24px] border border-admin-line bg-white p-5 shadow-[0_8px_24px_rgba(15,47,34,0.05)]"
          >
            <span className="rounded-full bg-admin-accent p-3">
              <stat.icon className="size-5 text-brand-700" strokeWidth={2} />
            </span>
            <div className="flex flex-col gap-1 text-left">
              <p className="font-display text-xl font-extrabold text-admin-ink">{stat.value}</p>
              <p className="text-xs font-medium text-admin-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-stretch gap-5 lg:flex-row">
        <RevenueChart monthlyRevenue={monthlyRevenue} />
        <TrafficSources trafficSources={trafficSources} />
      </div>

      <TopProductsList products={initialProducts} />
    </>
  );
}
