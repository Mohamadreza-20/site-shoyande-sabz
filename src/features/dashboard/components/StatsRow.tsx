import { Box, ShoppingCart, TrendingUp, UserPlus } from "lucide-react";
import type { StatCard } from "@/features/dashboard/types";

const icons = {
  box: Box,
  userPlus: UserPlus,
  shoppingCart: ShoppingCart,
  trendingUp: TrendingUp,
} as const;

export default function StatsRow({ statCards }: { statCards: StatCard[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = icons[stat.icon];
        return (
          <div
            key={stat.title}
            className="flex flex-col gap-4 rounded-[20px] border border-admin-line bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-admin-bg p-2.5">
                <Icon className="size-5 text-admin-primary" strokeWidth={2} />
              </span>
              <p className="text-sm font-medium text-admin-muted">{stat.title}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <p className="w-full text-right text-2xl font-bold text-admin-ink">{stat.value}</p>
              <div className="flex w-full items-center gap-1 text-xs">
                <span className="font-semibold text-admin-success">{stat.trendPct}</span>
                <span className="text-admin-muted">{stat.trendLabel}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
