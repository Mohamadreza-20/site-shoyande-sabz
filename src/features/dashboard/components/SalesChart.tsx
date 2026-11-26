"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { formatPrice } from "@/lib/money";

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
      <p className="text-sm font-bold text-admin-ink">{formatPrice(payload[0].value)}</p>
    </div>
  );
}

export default function SalesChart({
  weeklySales,
}: {
  weeklySales: { day: string; value: number }[];
}) {
  const { total, busiestDay } = useMemo(() => {
    const totalValue = weeklySales.reduce((sum, d) => sum + d.value, 0);
    const busiest = weeklySales.reduce(
      (best, d) => (d.value > best.value ? d : best),
      weeklySales[0] ?? { day: "-", value: 0 }
    );
    return { total: totalValue, busiestDay: busiest };
  }, [weeklySales]);
  const average = weeklySales.length ? Math.round(total / weeklySales.length) : 0;

  return (
    <div className="flex w-full flex-col gap-5 rounded-[24px] border border-admin-line bg-white p-6 shadow-[0_8px_24px_rgba(15,47,34,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-lg font-extrabold text-admin-ink">Order value trend</p>
        <p className="rounded-full bg-admin-success-bg px-3 py-1 text-xs font-semibold text-admin-success">
          Last 7 orders
        </p>
      </div>

      {weeklySales.length === 0 ? (
        <p className="py-16 text-center text-sm text-admin-muted">No orders yet.</p>
      ) : (
        <div className="h-[280px] w-full sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySales} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ADMIN_PRIMARY} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={ADMIN_PRIMARY} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2dfcc" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#5d6b63" }}
                axisLine={{ stroke: "#e2dfcc" }}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={ADMIN_PRIMARY}
                strokeWidth={3}
                fill="url(#salesFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex flex-col gap-1 text-left text-[13px]">
        <p className="text-admin-muted">The highest order value was on {busiestDay.day}.</p>
        <p className="font-semibold text-admin-primary">
          Average order value: {formatPrice(average)}
        </p>
      </div>
    </div>
  );
}
