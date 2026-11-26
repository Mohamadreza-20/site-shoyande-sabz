"use client";

import Link from "next/link";
import { Flower2, Home as HomeIcon, Shirt, Soup, SprayCan } from "lucide-react";
import type { Category } from "@/features/products/types";
import { useCategories } from "@/features/products/hooks";
import MarkerLabel from "@/components/ui/MarkerLabel";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";

const icons = {
  spray: SprayCan,
  shirt: Shirt,
  soup: Soup,
  home: HomeIcon,
  flower: Flower2,
} as const;

export default function CategoryShowcaseClient({
  initialCategories,
  fetchedAt,
}: {
  initialCategories: Category[];
  fetchedAt?: number;
}) {
  const {
    data: categories = initialCategories,
    isError,
    refetch,
  } = useCategories(initialCategories, fetchedAt);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-[60px] lg:py-16">
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-muted">
        Quick access
      </p>
      <h2 className="mb-8 text-2xl lg:text-[34px]">
        <MarkerLabel>Shop by category</MarkerLabel>
      </h2>
      {isError && (
        <div className="mb-6">
          <StaleDataNotice variant="storefront" onRetry={() => refetch()} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => {
          const Icon = icons[cat.icon];
          const href = `/products?category=${encodeURIComponent(cat.title)}`;
          return (
            <Link
              key={cat.id}
              href={href}
              className="group flex flex-col items-center gap-4 text-center max-sm:last:odd:col-span-2"
            >
              <span className="relative flex size-[104px] items-center justify-center sm:size-[120px]">
                <span
                  aria-hidden
                  className="absolute -bottom-1 -left-1 size-[44%] rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
                />
                <span className="relative flex size-full items-center justify-center rounded-full border-[5px] border-[#f7f3e8] bg-brand-100 shadow-[0_10px_24px_rgba(15,47,34,0.12)] transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon className="size-9 text-brand-700 sm:size-10" strokeWidth={1.6} />
                </span>
              </span>
              <p className="font-display text-base font-extrabold text-brand-700">{cat.title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
