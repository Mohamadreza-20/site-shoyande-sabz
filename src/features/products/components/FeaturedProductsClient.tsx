"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/features/products/types";
import { useFeaturedProducts } from "@/features/products/hooks";
import ProductCard from "./ProductCard";
import { gridContainer } from "@/components/motion/variants";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";

export default function FeaturedProductsClient({
  initialProducts,
  fetchedAt,
}: {
  initialProducts: Product[];
  fetchedAt?: number;
}) {
  const {
    data: products = initialProducts,
    isError,
    refetch,
  } = useFeaturedProducts(initialProducts, fetchedAt);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-[120px] lg:py-16">
      <div className="mb-8 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Link
          href="/products"
          className="cursor-pointer flex items-center gap-2 text-sm font-bold text-brand-500 transition hover:text-brand-700"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2.5} />
          مشاهده همه محصولات
        </Link>
        <h2 className="text-right text-2xl font-black text-brand-700 lg:text-[28px]">
          پرفروش‌ترین شوینده‌های ارگانیک
        </h2>
      </div>

      {isError && (
        <div className="mb-6">
          <StaleDataNotice variant="storefront" onRetry={() => refetch()} />
        </div>
      )}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridContainer}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  );
}
