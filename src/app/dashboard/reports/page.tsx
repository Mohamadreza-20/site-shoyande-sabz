import type { Metadata } from "next";
import PageHeader from "@/features/dashboard/components/PageHeader";
import ReportsOverview from "@/features/dashboard/components/ReportsOverview";
import { getAnalytics } from "@/features/dashboard/api";
import { getProducts } from "@/features/products/api";
import { getOrders } from "@/features/orders/api";
import { getCustomers } from "@/features/customers/api";

export const metadata: Metadata = {
  title: "گزارشات | پنل مدیریت شست‌وشو سبز",
  description: "گزارش‌های فروش، درآمد و عملکرد فروشگاه شست‌وشو سبز.",
};

export default async function AdminReportsPage() {
  const [analytics, products, orders, customers] = await Promise.all([
    getAnalytics(),
    getProducts(),
    getOrders(),
    getCustomers(),
  ]);

  return (
    <>
      <PageHeader
        title="گزارشات و آمار فروش"
        description="نمای کلی از عملکرد فروش، درآمد و رفتار مشتریان فروشگاه"
      />
      <ReportsOverview
        initialAnalytics={analytics}
        initialProducts={products}
        initialOrders={orders}
        initialCustomers={customers}
      />
    </>
  );
}
