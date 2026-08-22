import type { Metadata } from "next";
import { Suspense } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
import PageHeader from "@/features/dashboard/components/PageHeader";
import OrdersFullTable from "@/features/orders/components/OrdersFullTable";
import OrdersStats from "@/features/orders/components/OrdersStats";
import { getOrders } from "@/features/orders/api";
import ExportOrdersButton from "@/features/orders/components/ExportOrdersButton";

export const metadata: Metadata = {
  title: "سفارشات | پنل مدیریت شست‌وشو سبز",
  description: "مدیریت و پیگیری سفارشات مشتریان فروشگاه شست‌وشو سبز.",
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  const fetchedAt = Date.now();

  return (
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
        <PageHeader
          title="مدیریت سفارشات"
          description="پیگیری وضعیت سفارشات ثبت‌شده و مدیریت فرآیند ارسال"
        >
          <ExportOrdersButton orders={orders} />
        </PageHeader>

        <OrdersStats initialOrders={orders} fetchedAt={fetchedAt} />

        <Suspense fallback={null}>
          <OrdersFullTable orders={orders} fetchedAt={fetchedAt} />
        </Suspense>
      </main>
      <Sidebar />
    </div>
  );
}
