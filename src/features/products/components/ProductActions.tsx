"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/features/products/types";
import { useCartActions, formatToman } from "@/features/cart/context/CartContext";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCartActions();
  const { user, toggleWishlist } = useAuth();
  const isOutOfStock = product.stock === 0;
  const [quantity, setQuantity] = useState(isOutOfStock ? 0 : 1);
  const [wishlistBusy, setWishlistBusy] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isWishlisted = !!user?.wishlist.includes(product.id);
  const subtotal = product.priceValue * quantity;
  const quantityCap =
    typeof product.stock === "number" ? Math.min(product.stock, 99) : 99;
  const minQuantity = isOutOfStock ? 0 : 1;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleAddToCart() {
    if (isOutOfStock) return;
    const added = addItem(product, quantity);
    if (!added) {
      toast.error("موجودی این محصول کافی نیست.");
      return;
    }
    setJustAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setJustAdded(false), 1800);
    toast.success(`${product.title} به سبد خرید افزوده شد.`);
  }

  async function handleToggleWishlist() {
    if (!user) {
      toast.error("برای افزودن به علاقه‌مندی‌ها ابتدا وارد حساب کاربری شوید.");
      router.push("/auth");
      return;
    }
    if (user.role !== "customer") return;

    setWishlistBusy(true);
    const ok = await toggleWishlist(product.id);
    setWishlistBusy(false);

    if (!ok) {
      toast.error("بروزرسانی علاقه‌مندی‌ها با خطا مواجه شد. دوباره تلاش کنید.");
      return;
    }

    toast.success(
      isWishlisted ? "از لیست علاقه‌مندی‌ها حذف شد." : "به لیست علاقه‌مندی‌ها اضافه شد."
    );
  }

  return (
    <div className="flex w-full flex-col items-end gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-full border border-brand-200 bg-white px-2 py-2">
          <button
            type="button"
            aria-label="افزایش تعداد"
            disabled={isOutOfStock || quantity >= quantityCap}
            onClick={() => setQuantity((q) => Math.min(q + 1, quantityCap))}
            className="cursor-pointer flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="size-4" strokeWidth={2} />
          </button>
          <span className="min-w-[24px] text-center text-sm font-bold tabular-nums text-ink">
            {quantity.toLocaleString("fa-IR")}
          </span>
          <button
            type="button"
            aria-label="کاهش تعداد"
            disabled={isOutOfStock || quantity <= minQuantity}
            onClick={() => setQuantity((q) => Math.max(q - 1, minQuantity))}
            className="cursor-pointer flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="size-4" strokeWidth={2} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`cursor-pointer flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
            isOutOfStock
              ? "bg-muted-light"
              : justAdded
                ? "bg-brand-700"
                : "bg-brand-400 hover:bg-brand-500"
          }`}
        >
          {isOutOfStock ? (
            "ناموجود"
          ) : justAdded ? (
            <>
              <Check className="size-[18px]" strokeWidth={2.5} />
              به سبد اضافه شد
            </>
          ) : (
            <>
              <ShoppingCart className="size-[18px]" strokeWidth={2} />
              افزودن به سبد خرید
            </>
          )}
        </button>

        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          aria-pressed={isWishlisted}
          disabled={wishlistBusy}
          onClick={handleToggleWishlist}
          className={`cursor-pointer flex size-[52px] shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-60 ${
            isWishlisted
              ? "border-brand-400 bg-brand-50 text-brand-500"
              : "border-brand-200 bg-white text-brand-700 hover:bg-brand-50"
          }`}
        >
          <Heart className={`size-5 ${isWishlisted ? "fill-brand-500" : ""}`} strokeWidth={2} />
        </button>
      </div>

      {quantity > 1 && (
        <p className="text-sm text-muted">
          جمع {quantity.toLocaleString("fa-IR")} عدد:{" "}
          <span className="font-bold tabular-nums text-brand-700">{formatToman(subtotal)}</span>
        </p>
      )}
    </div>
  );
}
