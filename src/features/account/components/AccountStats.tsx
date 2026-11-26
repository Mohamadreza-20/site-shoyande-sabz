import { Package, ShoppingBag, Wallet } from "lucide-react";
import { formatNumber } from "@/lib/money";

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
    { icon: Package, value: formatNumber(ordersCount), label: "Orders placed" },
    { icon: ShoppingBag, value: formatNumber(cartItemsCount), label: "Items in your cart" },
    { icon: Wallet, value: cartTotal, label: "Current cart total" },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 rounded-[28px] border border-brand-200 bg-white p-5"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent">
            <stat.icon className="size-5 text-brand-700" strokeWidth={2} />
          </span>
          <div className="flex flex-col items-start gap-0.5 text-left">
            <p className="font-display text-xl font-extrabold text-brand-700">{stat.value}</p>
            <p className="text-xs font-medium text-muted">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
