"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Star } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/features/products/types";
import { useCartActions } from "@/features/cart/context/CartContext";
import { gridItem } from "@/components/motion/variants";

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartActions();
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const outOfStock = product.stock === 0;

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
        toast.error("موجودی این محصول تمام شده است.");
        return;
      }
      setJustAdded(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setJustAdded(false), 1500);
      toast.success(`${product.title} به سبد خرید افزوده شد.`);
    },
    [addItem, product, outOfStock]
  );

  return (
    <motion.article
      variants={gridItem}
      className="flex flex-col gap-4 rounded-3xl border border-brand-200 bg-white p-4 transition hover:shadow-md"
    >
<<<<<<< HEAD
      <Link href={`/products/${product.id}`} prefetch className="cursor-pointer flex flex-col gap-4">
=======
      <Link href={`/products/${product.id}`} className="cursor-pointer flex flex-col gap-4">
>>>>>>> origin/main
        <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-brand-50">
          <ProductImage
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            quality={60}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <p className="text-xs font-medium text-brand-500">{product.category}</p>
          <h3 className="line-clamp-1 w-full text-[16px] font-bold text-ink">
            {product.title}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted">{product.rating}</span>
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-end gap-2 text-right">
        <hr className="w-full border-brand-200" />
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label={outOfStock ? "ناموجود" : "افزودن به سبد خرید"}
            className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-xl p-2.5 transition ${
              outOfStock
                ? "cursor-not-allowed bg-brand-100 text-muted"
                : justAdded
                  ? "bg-brand-500 text-white"
                  : "bg-brand-300 hover:bg-brand-400 hover:text-white"
            }`}
          >
            {outOfStock ? (
              <span className="px-1 text-xs font-bold">ناموجود</span>
            ) : justAdded ? (
              <Check className="size-[18px]" strokeWidth={2.5} />
            ) : (
              <ShoppingCart className="size-[18px]" strokeWidth={2} />
            )}
          </button>
          <div className="flex flex-col items-end gap-0.5">
            {product.oldPrice && (
              <span className="text-xs text-muted line-through">{product.oldPrice}</span>
            )}
            <span className="text-[16px] font-extrabold text-brand-700">
              {product.price}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ProductCard);
