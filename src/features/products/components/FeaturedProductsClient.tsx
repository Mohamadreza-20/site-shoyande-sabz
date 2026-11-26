"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/features/products/types";
import { useFeaturedProducts, useSeedProductDetailCache } from "@/features/products/hooks";
import ProductCard from "./ProductCard";
import { gridContainer } from "@/components/motion/variants";
import MarkerLabel from "@/components/ui/MarkerLabel";
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

  useSeedProductDetailCache(products, fetchedAt);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-[60px] lg:py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl lg:text-[34px]">
          <MarkerLabel>Best sellers</MarkerLabel>
        </h2>
        <Link
          href="/products"
          className="group flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
        >
          Shop all products
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.5}
          />
        </Link>
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
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  );
}
