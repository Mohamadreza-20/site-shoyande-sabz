"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Star } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/features/products/types";
import { useCartActions } from "@/features/cart/hooks/useCart";
import { formatPrice } from "@/lib/money";
import { gridItem } from "@/components/motion/variants";

function ProductCard({
  product,
  priority,
  headingAs: Heading = "h3",
}: {
  product: Product;
  priority?: boolean;
  headingAs?: "h2" | "h3";
}) {
  const { addItem } = useCartActions();
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const outOfStock = product.stock === 0;
  const discountPercent =
    product.oldPriceValue && product.oldPriceValue > product.priceValue
      ? Math.round(((product.oldPriceValue - product.priceValue) / product.oldPriceValue) * 100)
      : null;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (outOfStock) return;
      const added = addItem(product, 1);
      if (!added) {
        toast.error("This product is out of stock.");
        return;
      }
      setJustAdded(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setJustAdded(false), 1500);
      toast.success(`${product.title} added to your cart.`);
    },
    [addItem, product, outOfStock]
  );

  return (
    <motion.article
      variants={gridItem}
      className="group flex h-full min-w-0 flex-col gap-3 rounded-[22px] border border-brand-200 bg-white p-3 shadow sm:gap-4 sm:rounded-[28px] sm:p-4 shadow-[0_8px_24px_rgba(15,47,34,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,47,34,0.12)]"
    >
      <Link
        href={`/products/${product.id}`}
        prefetch
        className="flex flex-1 flex-col items-center gap-3 sm:gap-4"
      >
        <div className="relative mt-1 aspect-square w-full max-w-[180px] sm:mt-2">
          <span
            aria-hidden
            className="absolute -bottom-1 -left-1 size-[46%] rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
          />
          <div className="relative size-full overflow-hidden rounded-full border-4 border-[#f7f3e8] sm:border-[5px] bg-brand-100 shadow-[0_10px_24px_rgba(15,47,34,0.15)]">
            <ProductImage
              src={product.image}
              alt={product.title}
              fill
              sizes="180px"
              quality={60}
              priority={priority}
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          </div>
          {discountPercent !== null && (
            <span className="absolute -right-1 top-1 rounded-full bg-brand-700 px-2.5 py-1 text-[11px] font-extrabold text-accent shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>
        <div className="flex w-full flex-col items-start gap-2 text-left">
          <p className="max-w-full truncate rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-bold text-brand-600 sm:text-xs">
            {product.category}
          </p>
          <Heading className="line-clamp-2 min-h-[2.8em] w-full break-words font-display text-[14px] font-extrabold leading-[1.4] text-ink sm:text-[17px]">
            {product.title}
          </Heading>
          <div className="flex items-center gap-1">
            <Star className="size-3.5 fill-accent text-accent" />
            <span className="text-xs font-bold text-ink">{product.ratingValue.toFixed(1)}</span>
            <span className="text-xs text-muted">({product.reviewCount})</span>
          </div>
        </div>
      </Link>
      <div className="flex w-full flex-col gap-2 border-t border-brand-200 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-4">
        <div className="flex min-h-[2.6rem] flex-col items-start justify-end gap-0.5">
          {product.oldPriceValue ? (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.oldPriceValue)}
            </span>
          ) : null}
          <span className="font-display text-base font-extrabold text-brand-700 sm:text-lg">
            {formatPrice(product.priceValue)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={outOfStock}
          aria-label={outOfStock ? "Out of stock" : `Add ${product.title} to cart`}
          className={`flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] sm:w-auto font-extrabold transition ${
            outOfStock
              ? "cursor-not-allowed bg-brand-100 text-muted"
              : justAdded
                ? "bg-brand-700 text-white"
                : "bg-accent text-brand-700 hover:brightness-95"
          }`}
        >
          {outOfStock ? (
            "Sold out"
          ) : justAdded ? (
            <>
              <Check className="size-4" strokeWidth={2.5} /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="size-4" strokeWidth={2} /> Add
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

export default memo(ProductCard);
