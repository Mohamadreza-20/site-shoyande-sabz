import { fetchedAtNow } from "@/lib/http";
import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/features/dashboard/components/PageHeader";
import OrdersFullTable from "@/features/orders/components/OrdersFullTable";
import OrdersStats from "@/features/orders/components/OrdersStats";
import { getOrders } from "@/features/orders/api";
import ExportOrdersButton from "@/features/orders/components/ExportOrdersButton";

export const metadata: Metadata = {
  title: "Orders | Admin",
  description: "Manage and track customer orders.",
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  const fetchedAt = fetchedAtNow();

  return (
    <>
      <PageHeader title="Manage orders" description="Track order status and manage fulfilment">
        <ExportOrdersButton orders={orders} />
      </PageHeader>

      <OrdersStats initialOrders={orders} fetchedAt={fetchedAt} />

      <Suspense fallback={null}>
        <OrdersFullTable orders={orders} fetchedAt={fetchedAt} />
      </Suspense>
    </>
  );
}
