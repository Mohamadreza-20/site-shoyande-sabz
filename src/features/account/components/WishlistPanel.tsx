"use client";

import Link from "next/link";
import ProductImage from "@/features/products/components/ProductImage";
import { ArrowRight, Heart, Trash2 } from "lucide-react";
import { memo } from "react";
import type { Product } from "@/features/products/types";

const WishlistItem = memo(function WishlistItem({
  product,
  isRemoving,
  onRemove,
}: {
  product: Product;
  isRemoving: boolean;
  onRemove: (productId: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[20px] border border-brand-200 p-3 text-left">
      <Link
        href={`/products/${product.id}`}
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-brand-50"
      >
        <ProductImage
          src={product.image}
          alt={product.title}
          fill
          sizes="64px"
          className="object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <Link
          href={`/products/${product.id}`}
          className="line-clamp-1 w-full text-sm font-bold text-ink transition hover:text-brand-400"
        >
          {product.title}
        </Link>
        <span className="text-sm font-bold text-brand-700">{product.price}</span>
      </div>
      <button
        type="button"
        aria-label="Remove from wishlist"
        disabled={isRemoving}
        onClick={() => onRemove(product.id)}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand-200 text-brand-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash2 className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
});

function WishlistPanel({
  products,
  loading,
  removingId,
  onRemove,
}: {
  products: Product[];
  loading: boolean;
  removingId: string | null;
  onRemove: (productId: string) => void;
}) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[32px] border border-brand-200 bg-white">
      <div className="flex items-center justify-between gap-4 p-6">
        <p className="font-display text-xl font-extrabold text-brand-700">
          Wishlist ({products.length.toLocaleString("en-US")})
        </p>
        <Link
          href="/products"
          className="flex min-h-10 items-center gap-1.5 text-sm font-bold text-brand-700 group/link transition-colors"
        >
          Browse products
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
            strokeWidth={2.5}
          />
        </Link>
      </div>

      {loading ? (
        <p className="px-6 pb-6 text-sm text-muted">Loading your wishlist...</p>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center gap-4 px-6 pb-10 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-brand-100">
            <Heart className="size-6 text-brand-400" strokeWidth={1.75} />
          </span>
          <p className="text-sm text-muted">
            Your wishlist is empty. Save products you love and find them here.
          </p>
          <Link
            href="/products"
            className="flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 px-6 pb-6 sm:grid-cols-2">
          {products.map((product) => (
            <WishlistItem
              key={product.id}
              product={product}
              isRemoving={removingId === product.id}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(WishlistPanel);
