"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/features/products/types";
import { useCartActions, formatPrice } from "@/features/cart/hooks/useCart";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCartActions();
  const { user, toggleWishlist } = useAuth();
  const isOutOfStock = product.stock === 0;
  const [quantity, setQuantity] = useState(1);
  const [wishlistBusy, setWishlistBusy] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isWishlisted = !!user?.wishlist.includes(product.id);
  const subtotal = product.priceValue * quantity;
  const quantityCap = typeof product.stock === "number" ? Math.min(product.stock, 99) : 99;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleAddToCart() {
    if (isOutOfStock) return;
    const added = addItem(product, quantity);
    if (!added) {
      toast.error("Not enough stock available.");
      return;
    }
    setJustAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setJustAdded(false), 1800);
    toast.success(`${product.title} added to your cart.`);
  }

  async function handleToggleWishlist() {
    if (!user) {
      toast.error("Please sign in to save items to your wishlist.");
      router.push("/auth");
      return;
    }
    if (user.role !== "customer") return;

    setWishlistBusy(true);
    const ok = await toggleWishlist(product.id);
    setWishlistBusy(false);

    if (!ok) {
      toast.error("Couldn't update your wishlist. Please try again.");
      return;
    }

    toast.success(isWishlisted ? "Removed from your wishlist." : "Added to your wishlist.");
  }

  return (
    <div className="flex w-full flex-col items-start gap-3">
      <div className="flex w-full flex-wrap items-center gap-3 sm:flex-nowrap">
        {!isOutOfStock && (
          <div className="flex h-[52px] shrink-0 items-center gap-0.5 rounded-full border border-brand-200 bg-white px-1">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="size-4" strokeWidth={2} />
            </button>
            <span
              aria-live="polite"
              className="w-9 text-center text-sm font-bold tabular-nums text-ink"
            >
              {quantity.toLocaleString("en-US")}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={quantity >= quantityCap}
              onClick={() => setQuantity((q) => Math.min(q + 1, quantityCap))}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="size-4" strokeWidth={2} />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`order-last flex h-[52px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-bold transition disabled:cursor-not-allowed sm:order-none sm:w-[190px] sm:shrink-0 ${
            isOutOfStock
              ? "bg-brand-100 text-muted"
              : justAdded
                ? "bg-brand-400 text-white"
                : "bg-brand-700 text-white hover:bg-brand-600"
          }`}
        >
          {isOutOfStock ? (
            "Out of stock"
          ) : justAdded ? (
            <>
              <Check className="size-[18px]" strokeWidth={2.5} />
              Added to cart
            </>
          ) : (
            <>
              <ShoppingCart className="size-[18px]" strokeWidth={2} />
              Add to cart
            </>
          )}
        </button>

        <button
          type="button"
          aria-label="Add to wishlist"
          aria-pressed={isWishlisted}
          disabled={wishlistBusy}
          onClick={handleToggleWishlist}
          className={`ml-auto flex size-[52px] shrink-0 items-center justify-center rounded-full border transition sm:ml-0 disabled:cursor-not-allowed disabled:opacity-60 ${
            isWishlisted
              ? "border-accent bg-accent-soft text-brand-700"
              : "border-brand-200 bg-white text-brand-700 hover:bg-accent-soft"
          }`}
        >
          <Heart className={`size-5 ${isWishlisted ? "fill-brand-700" : ""}`} strokeWidth={2} />
        </button>
      </div>

      <p
        aria-hidden={quantity <= 1}
        className={`h-5 text-sm leading-5 text-muted ${quantity > 1 ? "" : "invisible"}`}
      >
        Total for {Math.max(quantity, 2).toLocaleString("en-US")}:{" "}
        <span className="font-bold tabular-nums text-brand-700">{formatPrice(subtotal)}</span>
      </p>
    </div>
  );
}
