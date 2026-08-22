import type { Metadata } from "next";
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
import WelcomeRow from "@/features/dashboard/components/WelcomeRow";
import DashboardOverview from "@/features/dashboard/components/DashboardOverview";
import { getDashboardOverview } from "@/features/dashboard/api";
import { getLatestOrders } from "@/features/orders/api";

export const metadata: Metadata = {
  title: "پنل کاربری | شست‌وشو سبز",
  description: "داشبورد مدیریت فروشگاه محصولات شوینده ارگانیک شست‌وشو سبز",
};

export default async function DashboardPage() {
  const [overview, orders] = await Promise.all([getDashboardOverview(), getLatestOrders(20)]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
        <WelcomeRow />
        <DashboardOverview initialOverview={overview} initialOrders={orders} />
      </main>
      <Sidebar />
    </div>
  );
}
