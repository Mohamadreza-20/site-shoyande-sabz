"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ADMIN_PRIMARY = "#256b4a";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-admin-line bg-white px-3 py-2 text-left shadow-sm">
      <p className="text-xs text-admin-muted">{label}</p>
      <p className="text-sm font-bold text-admin-ink">
        ${payload[0].value.toLocaleString("en-US")}K
      </p>
    </div>
  );
}

export default function RevenueChart({
  monthlyRevenue,
}: {
  monthlyRevenue: { month: string; value: number }[];
}) {
  return (
    <div className="flex w-full flex-1 flex-col gap-5 rounded-[24px] border border-admin-line bg-white p-4 sm:p-6 shadow-[0_8px_24px_rgba(15,47,34,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-lg font-extrabold text-admin-ink">Monthly revenue ($K)</p>
        <p className="rounded-full bg-admin-success-bg px-3 py-1 text-xs font-semibold text-admin-success">
          Last 6 months
        </p>
      </div>

      {monthlyRevenue.length === 0 ? (
        <p className="py-16 text-center text-sm text-admin-muted">No data to display.</p>
      ) : (
        <div className="h-[240px] w-full shrink-0 sm:h-[280px] lg:h-auto lg:min-h-[280px] lg:flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2dfcc" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#5d6b63" }}
                axisLine={{ stroke: "#e2dfcc" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#5d6b63" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "#fbe9b7" }} />
              <Bar dataKey="value" fill={ADMIN_PRIMARY} radius={[8, 8, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
