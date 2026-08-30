import { Package, ShoppingBag, User as UserIcon } from "lucide-react";

export default function AccountStats({
  ordersCount,
  cartItemsCount,
  cartTotal,
}: {
  ordersCount: number;
  cartItemsCount: number;
  cartTotal: string;
}) {
  const stats = [
    { icon: Package, value: ordersCount.toLocaleString("fa-IR"), label: "سفارش‌های ثبت شده" },
    { icon: ShoppingBag, value: cartItemsCount.toLocaleString("fa-IR"), label: "کالا در سبد خرید فعلی" },
    { icon: UserIcon, value: cartTotal, label: "مبلغ سبد خرید فعلی" },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center justify-between gap-3 rounded-2xl border border-brand-200 bg-white p-5"
        >
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="text-lg font-bold text-brand-700">{stat.value}</p>
            <p className="text-xs font-medium text-muted">{stat.label}</p>
          </div>
          <span className="rounded-xl bg-brand-100 p-2.5">
            <stat.icon className="size-5 text-brand-500" strokeWidth={2} />
          </span>
        </div>
      ))}
    </div>
  );
}
