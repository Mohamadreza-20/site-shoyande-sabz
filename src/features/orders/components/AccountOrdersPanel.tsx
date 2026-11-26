import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import type { Order } from "@/features/orders/types";
import { orderStatusStyles } from "@/features/orders/constants";

export default function OrdersPanel({ orders, loading }: { orders: Order[]; loading: boolean }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-brand-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 p-4 sm:p-6">
        <h2 className="font-display text-xl font-extrabold text-brand-700">My orders</h2>
        <Link
          href="/products"
          className="flex min-h-10 items-center gap-1.5 whitespace-nowrap text-sm font-bold text-brand-500 transition hover:text-brand-700"
        >
          Browse products
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </Link>
      </div>

      {loading ? (
        <p className="px-6 pb-6 text-sm text-muted">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 px-6 pb-10 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-brand-100">
            <Package className="size-6 text-brand-400" strokeWidth={1.75} />
          </span>
          <p className="text-sm text-muted">No orders on this account yet.</p>
          <Link
            href="/products"
            className="flex items-center gap-2 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div
          className="min-w-full overflow-x-auto"
          role="region"
          aria-label="Scrollable table"
          tabIndex={0}
        >
          <table
            data-table="account-orders"
            className="w-full min-w-[560px] border-collapse text-left"
          >
            <thead>
              <tr className="border-y border-brand-200 bg-brand-50 text-xs font-bold text-muted">
                <th scope="col" className="px-6 py-3 font-bold">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                  Products
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 font-bold">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left font-bold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const status = orderStatusStyles[order.status];
                return (
                  <tr key={order.id} className="border-b border-brand-200 last:border-b-0">
                    <td className="px-6 py-3.5 text-[13px] text-ink">{order.orderNumber}</td>
                    <td className="px-6 py-3.5 text-sm text-ink">{order.products}</td>
                    <td className="px-6 py-3.5 text-sm text-muted">{order.date}</td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-brand-700">
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
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
