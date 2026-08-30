"use client";

import { memo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

function ProductsFilterSidebar({
  allCategories,
  categoryCounts,
  selectedCategories,
  onToggleCategory,
  onClearFilters,
  search,
  onSearchChange,
}: {
  allCategories: string[];
  categoryCounts: Record<string, number>;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onClearFilters: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <aside className="flex w-full flex-col gap-6 rounded-3xl border border-brand-200 bg-white p-6 lg:w-[280px] lg:shrink-0">
      <div className="flex items-center justify-between">
        <button
          onClick={onClearFilters}
          className="cursor-pointer text-xs font-bold text-brand-500 transition hover:text-brand-700"
        >
          پاک کردن فیلترها
        </button>
        <div className="flex items-center gap-2 text-[15px] font-bold text-brand-700">
          فیلترها
          <SlidersHorizontal className="size-4" strokeWidth={2} />
        </div>
      </div>

      <div className="flex items-center rounded-full border border-brand-200 bg-brand-50 px-4 py-2.5">
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="جستجوی محصول..."
          dir="rtl"
          className="w-full bg-transparent text-right text-sm text-ink placeholder:text-muted focus:outline-none"
        />
        <Search className="size-4 shrink-0 text-muted" strokeWidth={2} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-brand-700">دسته‌بندی</h3>
        {allCategories.map((category) => {
          const count = categoryCounts[category] ?? 0;
          return (
            <label key={category} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onToggleCategory(category)}
                className="size-4 shrink-0 rounded border-brand-300 accent-brand-400"
              />
              <span className="flex-1 text-right">{category}</span>
              <span className="text-xs text-muted">{count}</span>
            </label>
          );
        })}
      </div>
    </aside>
  );
}

export default memo(ProductsFilterSidebar);
