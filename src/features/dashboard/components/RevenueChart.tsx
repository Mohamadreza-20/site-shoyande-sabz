"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ADMIN_PRIMARY = "#4c7c6d";

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
    <div className="rounded-xl border border-admin-line bg-white px-3 py-2 text-right shadow-sm">
      <p className="text-xs text-admin-muted">{label}</p>
      <p className="text-sm font-bold text-admin-ink">
        {payload[0].value.toLocaleString("fa-IR")} میلیون تومان
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
    <div className="flex w-full flex-1 flex-col gap-5 rounded-3xl border border-admin-line bg-white p-6">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-admin-success">روند صعودی ۶ ماه اخیر</p>
        <p className="text-base font-bold text-admin-ink">درآمد ماهیانه (میلیون تومان)</p>
      </div>

      {monthlyRevenue.length === 0 ? (
        <p className="py-16 text-center text-sm text-admin-muted">داده‌ای برای نمایش وجود ندارد.</p>
      ) : (
        <div className="min-h-[220px] w-full flex-1" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d6e2de" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#607368" }}
                axisLine={{ stroke: "#d6e2de" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#607368" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "#eefbf3" }} />
              <Bar dataKey="value" fill={ADMIN_PRIMARY} radius={[8, 8, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
