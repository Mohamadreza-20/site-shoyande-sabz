"use client";

import { memo, useCallback, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { sortOptions, type SortValue } from "@/features/products/product-sort";
import { useDismissable } from "@/lib/hooks/useDismissable";

function ProductsToolbar({
  sort,
  onSortChange,
  resultCount,
  selectedCategories,
  onToggleCategory,
}: {
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
  resultCount: number;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const closeSort = useCallback(() => setSortOpen(false), []);
  useDismissable(sortRef, sortOpen, closeSort);
  const activeSortLabel = sortOptions.find((option) => option.value === sort)?.label ?? "Featured";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div ref={sortRef} className="relative">
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            className="flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-accent-soft"
          >
            Sort: {activeSortLabel}
            <ChevronDown
              className={`size-4 transition-transform ${sortOpen ? "rotate-180" : ""}`}
              strokeWidth={2}
            />
          </button>
          {sortOpen && (
            <div
              role="listbox"
              className="absolute left-0 z-10 mt-2 w-52 overflow-hidden rounded-2xl border border-brand-200 bg-white py-1.5 shadow-lg"
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  role="option"
                  aria-selected={sort === option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setSortOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-accent-soft ${
                    sort === option.value ? "font-bold text-brand-400" : "text-ink"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="order-first text-sm font-medium text-muted sm:order-none">
          {resultCount.toLocaleString("en-US")} {resultCount === 1 ? "product" : "products"} found
        </p>
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {selectedCategories.map((category) => (
            <button
              key={category}
              onClick={() => onToggleCategory(category)}
              className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-extrabold text-brand-700 transition hover:brightness-95"
            >
              <X className="size-3" strokeWidth={2.5} />
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(ProductsToolbar);
