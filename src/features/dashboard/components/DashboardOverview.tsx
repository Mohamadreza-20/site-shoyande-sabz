import type { Order } from "@/features/orders/types";
import type { Overview } from "@/features/dashboard/types";
import StatsRow from "./StatsRow";
import SalesChart from "./SalesChart";
import OrdersTable from "@/features/orders/components/OrdersTable";

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
      <OrdersTable orders={initialOrders} />
    </>
  );
}
