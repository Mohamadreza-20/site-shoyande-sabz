"use client";

import type { CategoryWithCount } from "@/features/products/types";
import { useCategoriesWithCounts } from "@/features/products/hooks";

export default function CategoriesSummary({
  initialCategories,
  fetchedAt,
}: {
  initialCategories: CategoryWithCount[];
  fetchedAt?: number;
}) {
  const { data: categories = initialCategories } = useCategoriesWithCounts(
    initialCategories,
    fetchedAt
  );
  const totalProducts = categories.reduce((sum, c) => sum + c.productCount, 0);

  return (
    <>
      {`${categories.length.toLocaleString("fa-IR")} دسته‌بندی فعال، شامل ${totalProducts.toLocaleString(
        "fa-IR"
      )} محصول`}
    </>
  );
}
