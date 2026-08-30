"use client";

import { memo, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ELLIPSIS = "…" as const;
const SIBLING_COUNT = 1;

function getPageItems(currentPage: number, totalPages: number): (number | typeof ELLIPSIS)[] {
  const totalNumbers = SIBLING_COUNT * 2 + 5;
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - SIBLING_COUNT, 1);
  const rightSibling = Math.min(currentPage + SIBLING_COUNT, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const items: (number | typeof ELLIPSIS)[] = [1];

  if (showLeftEllipsis) {
    items.push(ELLIPSIS);
  } else {
    for (let page = 2; page < leftSibling; page += 1) items.push(page);
  }

  for (let page = leftSibling; page <= rightSibling; page += 1) {
    if (page !== 1 && page !== totalPages) items.push(page);
  }

  if (showRightEllipsis) {
    items.push(ELLIPSIS);
  } else {
    for (let page = rightSibling + 1; page < totalPages; page += 1) items.push(page);
  }

  items.push(totalPages);

  return items;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  scrollOnChange = true,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  scrollOnChange?: boolean;
}) {
  const items = useMemo(() => getPageItems(currentPage, totalPages), [currentPage, totalPages]);

  const handleChange = (page: number) => {
    if (page === currentPage || disabled) return;
    onPageChange(page);
    if (scrollOnChange) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => handleChange(Math.max(currentPage - 1, 1))}
        disabled={disabled || currentPage === 1}
        aria-label="صفحه قبلی"
        className="cursor-pointer flex size-9 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </button>

      {items.map((item, index) =>
        item === ELLIPSIS ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="flex size-9 items-center justify-center text-sm font-semibold text-muted"
          >
            {ELLIPSIS}
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => handleChange(item)}
            disabled={disabled}
            aria-current={item === currentPage ? "page" : undefined}
            className={`cursor-pointer flex size-9 items-center justify-center rounded-full text-sm font-semibold transition disabled:cursor-not-allowed ${
              item === currentPage
                ? "bg-brand-400 text-white"
                : "border border-brand-200 bg-white text-ink hover:bg-brand-100"
            }`}
          >
            {item.toLocaleString("fa-IR")}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => handleChange(Math.min(currentPage + 1, totalPages))}
        disabled={disabled || currentPage === totalPages}
        aria-label="صفحه بعدی"
        className="cursor-pointer flex size-9 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}

export default memo(Pagination);
