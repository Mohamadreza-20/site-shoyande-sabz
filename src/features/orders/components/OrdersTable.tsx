"use client";

import type { Order } from "@/features/orders/types";
import { useOrders } from "@/features/orders/hooks";
import { orderStatusStyles } from "@/features/orders/constants";
import { TableStateRow } from "@/components/ui/TableStateRow";

export default function OrdersTable({
  orders: initialOrders,
  fetchedAt,
}: {
  orders: Order[];
  fetchedAt?: number;
}) {
  const { data: orders = initialOrders, isError, refetch } = useOrders(initialOrders, fetchedAt);
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-admin-line bg-white">
      <div className="flex items-center justify-end p-6">
        <p className="text-lg font-bold text-admin-ink">آخرین سفارشات ثبت شده</p>
      </div>

      <div className="min-w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-right">
          <thead>
            <tr className="border-y border-admin-line bg-admin-bg text-xs font-bold text-admin-muted">
              <th scope="col" className="px-6 py-3 font-bold">شناسه</th>
              <th scope="col" className="px-6 py-3 font-bold">مشتری</th>
              <th scope="col" className="px-6 py-3 font-bold">محصولات انتخاب شده</th>
              <th scope="col" className="px-6 py-3 font-bold">مجموع مبلغ</th>
              <th scope="col" className="px-6 py-3 text-right font-bold">وضعیت سفارش</th>
            </tr>
          </thead>
          <tbody>
            {isError ? (
              <TableStateRow
                colSpan={5}
                isError
                errorMessage="دریافت سفارشات با خطا مواجه شد."
                emptyMessage=""
                onRetry={() => refetch()}
              />
            ) : orders.length === 0 ? (
              <TableStateRow
                colSpan={5}
                isError={false}
                errorMessage=""
                emptyMessage="هنوز سفارشی ثبت نشده است."
              />
            ) : (
              orders.map((order) => {
                const status = orderStatusStyles[order.status];
                return (
                  <tr key={order.id} className="border-b border-admin-line last:border-b-0">
                    <td className="px-6 py-3.5 text-[13px] text-admin-ink">{order.orderNumber}</td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-admin-ink">
                      {order.customer}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-admin-ink">{order.products}</td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-admin-primary">
                      {order.amount}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.border} ${status.text}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
