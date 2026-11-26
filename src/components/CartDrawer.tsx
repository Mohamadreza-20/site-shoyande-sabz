"use client";

import Link from "next/link";
import ProductImage from "@/features/products/components/ProductImage";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { memo, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart, useCartActions, formatPrice, type CartItem } from "@/features/cart/hooks/useCart";
import { drawerBackdrop, drawerPanel } from "@/components/motion/variants";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useOverlay } from "@/lib/hooks/useOverlay";
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
    <li className="flex gap-3 rounded-2xl border border-brand-200 bg-white p-3 text-left">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-[#f7f3e8] bg-brand-100">
        <ProductImage
          src={item.image}
          alt={item.title}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-bold leading-snug text-ink">{item.title}</p>
            <p className="text-xs tabular-nums text-muted">{formatPrice(item.priceValue)} each</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.title} from cart`}
            className="-mr-1 -mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="size-4" strokeWidth={2} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-full border border-brand-200 bg-white p-1">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="flex size-7 items-center justify-center rounded-full bg-brand-100 transition hover:bg-accent-soft"
              aria-label="Decrease quantity"
            >
              <Minus className="size-3.5 text-brand-700" strokeWidth={2} />
            </button>
            <span className="w-7 text-center text-xs font-bold tabular-nums text-ink">
              {item.quantity.toLocaleString("en-US")}
            </span>
            <button
              type="button"
              disabled={atMaxQuantity}
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="flex size-7 items-center justify-center rounded-full bg-brand-100 transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-100"
              aria-label="Increase quantity"
            >
              <Plus className="size-3.5 text-brand-700" strokeWidth={2} />
            </button>
          </div>
          <p className="text-sm font-extrabold tabular-nums text-brand-700">
            {formatPrice(item.priceValue * item.quantity)}
          </p>
        </div>
        {atMaxQuantity && (
          <p className="text-[11px] font-semibold text-amber-700">
            Maximum available stock reached.
          </p>
        )}
      </div>
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

  useOverlay(open, onClose);

  if (typeof document === "undefined") return null;

  return createPortal(
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
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            tabIndex={-1}
            variants={drawerPanel("right")}
            className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-[420px] flex-col bg-[#f7f3e8] shadow-xl outline-none"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-brand-200 px-4 py-4 sm:px-5">
              <span className="font-display text-xl font-extrabold text-brand-700">Your cart</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition hover:bg-accent-soft"
              >
                <X className="size-5" strokeWidth={2} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
              {syncError && items.length > 0 && (
                <div className="mb-4">
                  <StaleDataNotice
                    variant="storefront"
                    message="We couldn't refresh stock and prices."
                    onRetry={syncCart}
                  />
                </div>
              )}
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="size-10 text-brand-400" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-muted">Your cart is empty.</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
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
              <div className="flex shrink-0 flex-col gap-3 border-t border-brand-200 bg-[#f7f3e8] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-ink">Subtotal</span>
                  <span className="text-base font-extrabold tabular-nums text-brand-700">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-[15px] font-extrabold text-brand-700 transition hover:brightness-95"
                >
                  View cart &amp; checkout
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
