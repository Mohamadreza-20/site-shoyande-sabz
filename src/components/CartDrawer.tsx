"use client";

import Link from "next/link";
import ProductImage from "@/features/products/components/ProductImage";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { memo, useCallback, useEffect } from "react";
import {
  useCart,
  useCartActions,
  formatToman,
  type CartItem,
} from "@/features/cart/context/CartContext";
import { drawerBackdrop, drawerPanel } from "@/components/motion/variants";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";

const CartDrawerItem = memo(function CartDrawerItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const quantityCap = typeof item.stock === "number" ? Math.min(item.stock, 99) : 99;
  const atMaxQuantity = item.quantity >= quantityCap;

  return (
    <li className="flex items-center gap-3 text-right">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-brand-50">

        <ProductImage src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col items-end gap-1">
        <p className="line-clamp-1 text-sm font-bold text-ink">{item.title}</p>
        <p className="text-xs tabular-nums text-brand-500">{formatToman(item.priceValue)}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={atMaxQuantity}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="cursor-pointer flex size-6 items-center justify-center rounded-full bg-brand-50 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-50"
            aria-label="افزایش تعداد"
          >
            <Plus className="size-3.5 text-brand-700" strokeWidth={2} />
          </button>
          <span className="min-w-[16px] text-center text-xs font-bold tabular-nums text-ink">
            {item.quantity.toLocaleString("fa-IR")}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="cursor-pointer flex size-6 items-center justify-center rounded-full bg-brand-50 transition hover:bg-brand-100"
            aria-label="کاهش تعداد"
          >
            <Minus className="size-3.5 text-brand-700" strokeWidth={2} />
          </button>
        </div>
        {atMaxQuantity && (
          <p className="text-[11px] font-semibold text-amber-600">حداکثر موجودی رسیده است.</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label="حذف از سبد خرید"
        className="cursor-pointer flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-brand-50 hover:text-red-500"
      >
        <Trash2 className="size-4" strokeWidth={2} />
      </button>
    </li>
  );
});

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, totalPrice, syncError } = useCart();
  const { syncCart } = useCartActions();
  const panelRef = useFocusTrap(open);

  const handleUpdateQuantity = useCallback(
    (id: string, quantity: number) => updateQuantity(id, quantity),
    [updateQuantity]
  );
  const handleRemove = useCallback((id: string) => removeItem(id), [removeItem]);

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={drawerBackdrop}
          className="fixed inset-0 z-50 bg-black/40"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-label="سبد خرید"
            tabIndex={-1}
            variants={drawerPanel("left")}
            className="absolute inset-y-0 left-0 flex w-[90%] max-w-[420px] flex-col bg-white shadow-xl outline-none"
          >
            <div className="flex items-center justify-between border-b border-brand-200 p-5">
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن سبد خرید"
                className="cursor-pointer flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100"
              >
                <X className="size-5" strokeWidth={2} />
              </button>
              <span className="text-base font-black text-brand-700">سبد خرید</span>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {syncError && items.length > 0 && (
                <div className="mb-4">
                  <StaleDataNotice
                    variant="storefront"
                    message="به‌روزرسانی موجودی و قیمت انجام نشد."
                    onRetry={syncCart}
                  />
                </div>
              )}
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="size-10 text-brand-300" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-muted">سبد خرید شما خالی است.</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemove}
                    />
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-brand-200 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-ink">جمع کل</span>
                  <span className="text-base font-extrabold tabular-nums text-brand-700">
                    {formatToman(totalPrice)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="cursor-pointer flex items-center justify-center rounded-full bg-brand-400 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-500"
                >
                  مشاهده و تسویه حساب
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
