import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { PERSIAN_MONTH_NAMES } from "../lib";

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
    <div className="flex w-full flex-col items-end gap-4 rounded-3xl border border-brand-200 bg-white p-5 text-right">
      <div className="flex items-center gap-2 text-sm font-bold text-brand-700">
        فیلتر بر اساس تاریخ
        <CalendarDays className="size-4" strokeWidth={2} />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <Link
          href="/blog"
          className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition ${
            selectedYear === undefined
              ? "bg-brand-400 text-white"
              : "bg-brand-50 text-brand-700 hover:bg-brand-100"
          }`}
        >
          همه سال‌ها
        </Link>
        {years.map((year) => (
          <Link
            key={year}
            href={`/blog/${year}`}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold tabular-nums transition ${
              selectedYear === year
                ? "bg-brand-400 text-white"
                : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            }`}
          >
            {year.toLocaleString("fa-IR")}
          </Link>
        ))}
      </div>

      {selectedYear !== undefined && months.length > 0 && (
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-brand-100 pt-4">
          <Link
            href={`/blog/${selectedYear}`}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition ${
              selectedMonth === undefined
                ? "bg-brand-300 text-brand-700"
                : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            }`}
          >
            همه ماه‌ها
          </Link>
          {months.map((month) => (
            <Link
              key={month}
              href={`/blog/${selectedYear}/${month}`}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition ${
                selectedMonth === month
                  ? "bg-brand-300 text-brand-700"
                  : "bg-brand-50 text-brand-700 hover:bg-brand-100"
              }`}
            >
              {PERSIAN_MONTH_NAMES[month - 1]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
