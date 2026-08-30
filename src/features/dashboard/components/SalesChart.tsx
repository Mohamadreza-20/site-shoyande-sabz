"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { formatTomanAmount } from "@/lib/money";

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
      <p className="text-sm font-bold text-admin-ink">{formatTomanAmount(payload[0].value)}</p>
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
    <div className="flex w-full flex-col gap-5 rounded-3xl border border-admin-line bg-white p-6">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-admin-success">۷ سفارش اخیر</p>
        <p className="text-base font-bold text-admin-ink">روند مبلغ سفارشات</p>
      </div>

      {weeklySales.length === 0 ? (
        <p className="py-16 text-center text-sm text-admin-muted">هنوز سفارشی ثبت نشده است.</p>
      ) : (
        <div className="h-[280px] w-full sm:h-[340px]" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySales} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ADMIN_PRIMARY} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={ADMIN_PRIMARY} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d6e2de" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#607368" }}
                axisLine={{ stroke: "#d6e2de" }}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={ADMIN_PRIMARY}
                strokeWidth={2.5}
                fill="url(#salesFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex flex-col gap-1 text-right text-[13px]">
        <p className="text-admin-muted">
          بیشترین مبلغ سفارش مربوط به {busiestDay.day} بود.
        </p>
        <p className="font-semibold text-admin-primary">
          میانگین مبلغ هر سفارش: {formatTomanAmount(average)}
        </p>
      </div>
    </div>
  );
}
