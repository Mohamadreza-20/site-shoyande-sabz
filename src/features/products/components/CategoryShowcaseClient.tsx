"use client";

import Link from "next/link";
import { Flower2, Home as HomeIcon, Shirt, Soup, SprayCan } from "lucide-react";
import type { Category } from "@/features/products/types";
import { useCategories } from "@/features/products/hooks";
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
    <section className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-[120px] lg:py-16">
      <h2 className="mb-8 text-right text-2xl font-black text-brand-700 lg:text-[28px]">
        دسته‌بندی‌های ارگانیک ما
      </h2>
      {isError && (
        <div className="mb-6">
          <StaleDataNotice variant="storefront" onRetry={() => refetch()} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => {
          const Icon = icons[cat.icon];
          const href = `/products?category=${encodeURIComponent(cat.title)}`;
          return (
            <Link
              key={cat.id}
              href={href}
              className="cursor-pointer flex flex-col items-center justify-center gap-3 rounded-3xl border border-brand-200 bg-white px-4 py-6 text-center transition hover:shadow-md"
            >
              <span className={`flex size-[72px] items-center justify-center rounded-full ${cat.bg}`}>
                <Icon className="size-8 text-brand-700" strokeWidth={1.75} />
              </span>
              <p className="text-sm font-bold text-ink">{cat.title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
