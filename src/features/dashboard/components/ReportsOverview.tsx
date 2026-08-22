import { BarChart3, ShoppingCart, TrendingUp, Users } from "lucide-react";
import type { Analytics } from "@/features/dashboard/types";
import type { Customer } from "@/features/customers/types";
import type { Order } from "@/features/orders/types";
import type { Product } from "@/features/products/types";
import RevenueChart from "./RevenueChart";
import TrafficSources from "./TrafficSources";
import TopProductsList from "@/features/products/components/admin/TopProductsList";

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
      label: "درآمد ۶ ماه اخیر",
      value: `${totalRevenue.toLocaleString("fa-IR")} میلیون تومان`,
    },
    {
      icon: BarChart3,
      label: "میانگین درآمد ماهانه",
      value: `${avgMonthly.toLocaleString("fa-IR")} میلیون تومان`,
    },
    {
      icon: ShoppingCart,
      label: "سفارشات ثبت‌شده",
      value: `${initialOrders.length.toLocaleString("fa-IR")} سفارش`,
    },
    {
      icon: Users,
      label: "مشتریان ثبت‌نام‌شده",
      value: `${initialCustomers.length.toLocaleString("fa-IR")} نفر`,
    },
  ];

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between gap-3 rounded-[20px] border border-admin-line bg-white p-5"
          >
            <div className="flex flex-col items-end gap-1 text-right">
              <p className="text-lg font-bold text-admin-ink">{stat.value}</p>
              <p className="text-xs font-medium text-admin-muted">{stat.label}</p>
            </div>
            <span className="rounded-xl bg-admin-bg p-2.5">
              <stat.icon className="size-5 text-admin-primary" strokeWidth={2} />
            </span>
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
