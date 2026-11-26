import { memo } from "react";
import { Eye } from "lucide-react";
import type { Order, OrderStatus } from "@/features/orders/types";
import { orderStatusStyles } from "@/features/orders/constants";
import { TableStateRow } from "@/components/ui/TableStateRow";
import Pagination from "@/components/Pagination";

export const orderTabs: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const OrderTableRow = memo(function OrderTableRow({
  order,
  onViewDetails,
}: {
  order: Order;
  onViewDetails: (order: Order) => void;
}) {
  const status = orderStatusStyles[order.status];
  return (
    <tr className="border-b border-admin-line last:border-b-0">
      <td className="px-6 py-3.5 text-[13px] text-admin-ink">{order.orderNumber}</td>
      <td className="px-6 py-3.5 text-sm font-semibold text-admin-ink">{order.customer}</td>
      <td className="px-6 py-3.5 text-sm text-admin-ink">{order.products}</td>
      <td className="px-6 py-3.5 text-[13px] text-admin-muted">{order.date}</td>
      <td className="px-6 py-3.5 text-sm font-semibold text-admin-primary">{order.amount}</td>
      <td className="px-6 py-3.5">
        <span
          className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.border} ${status.text}`}
        >
          {status.label}
        </span>
      </td>
      <td className="px-6 py-3.5">
        <button
          type="button"
          onClick={() => onViewDetails(order)}
          aria-label="View order details"
          className="flex size-8 items-center justify-center rounded-lg border border-admin-line text-admin-primary transition hover:bg-admin-bg"
        >
          <Eye className="size-4" strokeWidth={2} />
        </button>
      </td>
    </tr>
  );
});

export default function OrdersTableView({
  filteredOrders,
  activeTab,
  currentPage,
  totalPages,
  isError,
  onTabChange,
  onPageChange,
  onRetry,
  onViewDetails,
}: {
  filteredOrders: Order[];
  activeTab: OrderStatus | "all";
  currentPage: number;
  totalPages: number;
  isError: boolean;
  onTabChange: (value: OrderStatus | "all") => void;
  onPageChange: (value: number) => void;
  onRetry: () => void;
  onViewDetails: (order: Order) => void;
}) {
  const paginated = filteredOrders.slice((currentPage - 1) * 10, currentPage * 10);
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-3xl border border-admin-line bg-white">
      <div className="flex flex-col-reverse items-stretch justify-between gap-4 p-4 sm:flex-row sm:items-center sm:p-6">
        <div className="flex flex-wrap gap-2">
          {orderTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={`min-h-9 rounded-lg px-3 py-2 text-xs font-semibold transition ${activeTab === tab.value ? "bg-admin-primary text-white" : "bg-admin-bg text-admin-muted hover:text-admin-ink"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="text-lg font-bold text-admin-ink">Manage orders</p>
      </div>
      <div
        className="min-w-full overflow-x-auto"
        role="region"
        aria-label="Scrollable table"
        tabIndex={0}
      >
        <table data-table="orders" className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-y border-admin-line bg-admin-bg text-xs font-bold text-admin-muted">
              {["ID", "Customer", "Products", "Order date", "Total", "Order status", "Details"].map(
                (label) => (
                  <th scope="col" key={label} className="px-6 py-3 font-bold">
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.map((order) => (
              <OrderTableRow key={order.id} order={order} onViewDetails={onViewDetails} />
            ))}
            {filteredOrders.length === 0 && (
              <TableStateRow
                colSpan={7}
                isError={isError}
                errorMessage="Couldn't load the orders list."
                emptyMessage="No orders with this status."
                onRetry={onRetry}
              />
            )}
          </tbody>
        </table>
      </div>
      {filteredOrders.length > 0 && (
        <div className="flex w-full items-center justify-center border-t border-admin-line p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
