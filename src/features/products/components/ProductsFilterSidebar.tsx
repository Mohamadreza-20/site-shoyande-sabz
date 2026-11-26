"use client";

import Collapse from "@/components/ui/Collapse";
import { memo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  return (
    <aside className="flex w-full flex-col gap-4 rounded-[28px] border border-brand-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,47,34,0.05)] sm:p-6 lg:sticky lg:top-24 lg:w-[290px] lg:shrink-0 lg:gap-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="products-category-filters"
          className="flex min-h-10 items-center gap-2 font-display text-lg font-extrabold text-brand-700 lg:pointer-events-none"
        >
          <SlidersHorizontal className="size-4" strokeWidth={2.5} />
          Filters
          {selectedCategories.length > 0 && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-extrabold text-brand-700">
              {selectedCategories.length}
            </span>
          )}
          <ChevronDown
            className={`size-4 transition-transform lg:hidden ${open ? "rotate-180" : ""}`}
            strokeWidth={2.5}
          />
        </button>
        <button
          type="button"
          onClick={onClearFilters}
          className="min-h-10 px-1 text-xs font-bold text-brand-400 underline-offset-4 transition hover:text-brand-700 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-brand-200 bg-brand-100 px-4 py-2.5 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-400/30 transition-shadow">
        <Search className="size-4 shrink-0 text-muted" strokeWidth={2} />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full bg-transparent text-left text-sm text-ink placeholder:text-muted focus:outline-none"
        />
      </div>

      <Collapse id="products-category-filters" open={open} alwaysOpenFromLg>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted">Category</h2>
          {allCategories.map((category) => {
            const count = categoryCounts[category] ?? 0;
            return (
              <label
                key={category}
                className="flex min-h-8 cursor-pointer items-center gap-2.5 text-sm text-ink"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onToggleCategory(category)}
                  className="size-[18px] shrink-0 rounded border-brand-200 accent-brand-700"
                />
                <span className="flex-1 text-left">{category}</span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-bold text-brand-600">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </Collapse>
    </aside>
  );
}

export default memo(ProductsFilterSidebar);
