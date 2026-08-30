"use client";

import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#4c7c6d", "#7fa896", "#d9a752", "#a3b8ae", "#607368"];

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-admin-line bg-white px-3 py-2 text-right shadow-sm">
      <p className="text-xs text-admin-muted">{payload[0].name}</p>
      <p className="text-sm font-bold text-admin-ink">
        {payload[0].value.toLocaleString("fa-IR")}٪
      </p>
    </div>
  );
}

export default function TrafficSources({
  trafficSources,
}: {
  trafficSources: { label: string; pct: number }[];
}) {
  const data = useMemo(() => trafficSources.map((s) => ({ name: s.label, value: s.pct })), [trafficSources]);

  return (
    <div className="flex w-full shrink-0 flex-col gap-5 rounded-3xl border border-admin-line bg-white p-6 lg:w-[340px]">
      <p className="text-base font-bold text-admin-ink">منابع ورودی مشتریان</p>

      {data.length === 0 ? (
        <p className="py-16 text-center text-sm text-admin-muted">داده‌ای برای نمایش وجود ندارد.</p>
      ) : (
        <>
          <div className="min-h-[180px] w-full flex-1" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-3">
            {trafficSources.map((source, index) => (
              <div key={source.label} className="flex items-center justify-between text-sm">
                <span className="font-semibold text-admin-ink">
                  {source.pct.toLocaleString("fa-IR")}٪
                </span>
                <span className="flex items-center gap-2 text-admin-muted">
                  {source.label}
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
