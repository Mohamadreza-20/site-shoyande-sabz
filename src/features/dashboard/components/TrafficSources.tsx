"use client";

import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#256b4a", "#f2b33d", "#7fa896", "#0f2f22", "#c9d6b8"];

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-admin-line bg-white px-3 py-2 text-left shadow-sm">
      <p className="text-xs text-admin-muted">{payload[0].name}</p>
      <p className="text-sm font-bold text-admin-ink">
        {payload[0].value.toLocaleString("en-US")}%
      </p>
    </div>
  );
}

export default function TrafficSources({
  trafficSources,
}: {
  trafficSources: { label: string; pct: number }[];
}) {
  const data = useMemo(
    () => trafficSources.map((s) => ({ name: s.label, value: s.pct })),
    [trafficSources]
  );

  return (
    <div className="flex w-full shrink-0 flex-col gap-5 rounded-[24px] border border-admin-line bg-white p-6 shadow-[0_8px_24px_rgba(15,47,34,0.05)] lg:w-[340px]">
      <p className="font-display text-lg font-extrabold text-admin-ink">Traffic sources</p>

      {data.length === 0 ? (
        <p className="py-16 text-center text-sm text-admin-muted">No data to display.</p>
      ) : (
        <>
          <div className="h-[200px] w-full shrink-0">
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
                <span className="flex items-center gap-2 text-admin-muted">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {source.label}
                </span>
                <span className="font-semibold text-admin-ink">
                  {source.pct.toLocaleString("en-US")}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
