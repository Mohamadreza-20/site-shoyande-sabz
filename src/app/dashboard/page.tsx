import type { Metadata } from "next";
import WelcomeRow from "@/features/dashboard/components/WelcomeRow";
import DashboardOverview from "@/features/dashboard/components/DashboardOverview";
import { getDashboardOverview } from "@/features/dashboard/api";
import { getLatestOrders } from "@/features/orders/api";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Manage products, orders, customers and reports for the Leafwash store.",
};

export default async function DashboardPage() {
  const [overview, orders] = await Promise.all([getDashboardOverview(), getLatestOrders(20)]);

  return (
    <>
      <WelcomeRow />
      <DashboardOverview initialOverview={overview} initialOrders={orders} />
    </>
  );
}
