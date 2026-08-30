"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { Product } from "@/features/products/types";
import ProductCard from "./ProductCard";
import Pagination from "@/components/Pagination";
import { gridContainer } from "@/components/motion/variants";

function ProductsResultsGrid({
  products,
  isEmpty,
  page,
  totalPages,
  onPageChange,
  isLoading = false,
}: {
  products: Product[];
  isEmpty: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}) {
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-brand-200 py-16 text-center">
        <p className="text-lg font-bold text-brand-700">محصولی یافت نشد</p>
        <p className="text-sm text-muted">فیلترهای خود را تغییر دهید یا عبارت دیگری را جستجو کنید.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-6">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-start justify-center rounded-3xl bg-brand-50/70 pt-16 backdrop-blur-[1px]">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-md">
            <Loader2 className="size-4 animate-spin" strokeWidth={2} />
            در حال بارگذاری محصولات...
          </div>
        </div>
      )}
      <motion.div
        key={page}
        initial="hidden"
        animate="show"
        variants={gridContainer}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        disabled={isLoading}
        scrollOnChange={false}
      />
    </div>
  );
}

export default memo(ProductsResultsGrid);
