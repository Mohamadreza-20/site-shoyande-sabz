import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import type { Order } from "@/features/orders/types";
import { orderStatusStyles } from "@/features/orders/constants";

export default function OrdersPanel({ orders, loading }: { orders: Order[]; loading: boolean }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-brand-200 bg-white">
      <div className="flex items-center justify-between p-6">
        <Link href="/products" className="cursor-pointer flex items-center gap-1.5 text-sm font-bold text-brand-500">
          <ArrowLeft className="size-4" strokeWidth={2.5} />
          مشاهده محصولات
        </Link>
        <p className="text-lg font-bold text-brand-700">سفارش‌های من</p>
      </div>

      {loading ? (
        <p className="px-6 pb-6 text-sm text-muted">در حال بارگذاری سفارش‌ها...</p>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 px-6 pb-10 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-brand-100">
            <Package className="size-6 text-brand-400" strokeWidth={1.75} />
          </span>
          <p className="text-sm text-muted">هنوز سفارشی با این حساب کاربری ثبت نشده است.</p>
          <Link
            href="/products"
            className="cursor-pointer flex items-center gap-2 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            شروع خرید
          </Link>
        </div>
      ) : (
        <div className="min-w-full overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-right">
            <thead>
              <tr className="border-y border-brand-200 bg-brand-50 text-xs font-bold text-muted">
                <th scope="col" className="px-6 py-3 font-bold">شناسه سفارش</th>
                <th scope="col" className="px-6 py-3 font-bold">محصولات</th>
                <th scope="col" className="px-6 py-3 font-bold">تاریخ</th>
                <th scope="col" className="px-6 py-3 font-bold">مبلغ</th>
                <th scope="col" className="px-6 py-3 text-right font-bold">وضعیت</th>
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
                    <td className="px-6 py-3.5 text-sm font-semibold text-brand-700">{order.amount}</td>
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
