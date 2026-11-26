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
      {statCards.map((stat, index) => {
        const Icon = icons[stat.icon];
        const featured = index === 3;
        const negative = stat.trendPct.startsWith("-");
        return (
          <div
            key={stat.title}
            className={`flex flex-col gap-5 rounded-[24px] border p-6 shadow-[0_8px_24px_rgba(15,47,34,0.05)] ${
              featured
                ? "border-transparent bg-admin-sidebar text-white"
                : "border-admin-line bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p
                className={`text-sm font-medium ${featured ? "text-white/70" : "text-admin-muted"}`}
              >
                {stat.title}
              </p>
              <span
                className={`rounded-full p-2.5 ${featured ? "bg-admin-accent" : "bg-admin-bg"}`}
              >
                <Icon
                  className={`size-5 ${featured ? "text-brand-700" : "text-admin-primary"}`}
                  strokeWidth={2}
                />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p
                className={`font-display text-[28px] font-extrabold leading-none ${
                  featured ? "text-admin-accent" : "text-admin-ink"
                }`}
              >
                {stat.value}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`rounded-full px-2 py-0.5 font-bold ${
                    negative
                      ? "bg-admin-danger-bg text-red-700"
                      : "bg-admin-success-bg text-green-700"
                  }`}
                >
                  {stat.trendPct}
                </span>
                <span className={featured ? "text-white/70" : "text-admin-muted"}>
                  {stat.trendLabel}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
