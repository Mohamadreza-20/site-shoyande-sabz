import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/cn";
import { MONTH_NAMES } from "../lib";

const pill = "rounded-full px-4 py-1.5 text-xs font-bold transition";
const on = "bg-brand-700 text-white";
const off = "bg-white text-brand-700 hover:bg-accent-soft";

export default function BlogYearMonthFilter({
  years,
  months,
  selectedYear,
  selectedMonth,
}: {
  years: number[];
  months: number[];
  selectedYear?: number;
  selectedMonth?: number;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-4 rounded-[28px] border border-brand-200 bg-white/60 p-5 text-left">
      <div className="flex items-center gap-2 text-sm font-bold text-brand-700">
        <CalendarDays className="size-4" strokeWidth={2} />
        Filter by date
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link href="/blog" className={cn(pill, selectedYear === undefined ? on : off)}>
          All years
        </Link>
        {years.map((year) => (
          <Link
            key={year}
            href={`/blog/${year}`}
            className={cn(pill, "tabular-nums", selectedYear === year ? on : off)}
          >
            {year}
          </Link>
        ))}
      </div>

      {selectedYear !== undefined && months.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-brand-200 pt-4">
          <Link
            href={`/blog/${selectedYear}`}
            className={cn(pill, selectedMonth === undefined ? "bg-accent text-brand-700" : off)}
          >
            All months
          </Link>
          {months.map((month) => (
            <Link
              key={month}
              href={`/blog/${selectedYear}/${month}`}
              className={cn(pill, selectedMonth === month ? "bg-accent text-brand-700" : off)}
            >
              {MONTH_NAMES[month - 1]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
