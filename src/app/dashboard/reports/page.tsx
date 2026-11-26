import type { Metadata } from "next";
import PageHeader from "@/features/dashboard/components/PageHeader";
import ReportsOverview from "@/features/dashboard/components/ReportsOverview";
import { getAnalytics } from "@/features/dashboard/api";
import { getProducts } from "@/features/products/api";
import { getOrders } from "@/features/orders/api";
import { getCustomers } from "@/features/customers/api";

export const metadata: Metadata = {
  title: "Reports | Admin",
  description: "Sales, revenue and store performance reports.",
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
        title="Reports & sales analytics"
        description="An overview of sales, revenue and customer behaviour"
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
