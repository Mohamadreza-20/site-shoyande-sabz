import type { LucideIcon } from "lucide-react";

export type StatCardItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export default function StatsCardsGrid({
  stats,
  columns = 4,
}: {
  stats: StatCardItem[];
  columns?: 3 | 4;
}) {
  const largeColsClass = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <div className={`grid w-full grid-cols-1 gap-4 sm:grid-cols-2 ${largeColsClass}`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center justify-between gap-3 rounded-[20px] border border-admin-line bg-white p-5"
        >
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="text-lg font-bold text-admin-ink">{stat.value}</p>
            <p className="text-xs font-medium text-admin-muted">{stat.label}</p>
          </div>
          <span className="rounded-xl bg-admin-bg p-2.5">
            <stat.icon className="size-5 text-admin-primary" strokeWidth={2} />
          </span>
        </div>
      ))}
    </div>
  );
}
