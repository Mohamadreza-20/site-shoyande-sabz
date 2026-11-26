"use client";

import { CheckCircle2, Tag, X } from "lucide-react";
import { formatPrice } from "../../utils";
import type { Discount } from "@/features/discounts/types";

type CartSummaryProps = {
  totalPrice: number;
  discountAmount: number;
  finalTotalPrice: number;
  discountCode: string;
  appliedDiscount: Discount | null;
  isApplyingDiscount: boolean;
  onDiscountCodeChange: (value: string) => void;
  onApplyDiscount: () => void;
  onRemoveDiscount: () => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
};

export default function CartSummary({
  totalPrice,
  discountAmount,
  finalTotalPrice,
  discountCode,
  appliedDiscount,
  isApplyingDiscount,
  onDiscountCodeChange,
  onApplyDiscount,
  onRemoveDiscount,
  onCheckout,
  isCheckingOut,
}: CartSummaryProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-[28px] border border-brand-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,47,34,0.05)] sm:p-6 lg:sticky lg:top-24 lg:w-[380px] lg:shrink-0">
      <h2 className="font-display text-xl font-extrabold text-brand-700">Order summary</h2>

      <div className="rounded-2xl bg-brand-100 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-brand-700">
          <Tag className="size-4" strokeWidth={2} />
          <span>Discount code</span>
        </div>
        {appliedDiscount ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-200 bg-white p-3">
            <div className="flex min-w-0 items-center gap-2 text-left">
              <CheckCircle2 className="size-4 shrink-0 text-brand-400" />
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-brand-700">
                  {appliedDiscount.code}
                </p>
                <p className="text-xs text-muted">{formatPrice(discountAmount)} off</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onRemoveDiscount}
              aria-label="Remove discount code"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-red-50 hover:text-red-500"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={discountCode}
              onChange={(event) => onDiscountCodeChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onApplyDiscount();
                }
              }}
              inputMode="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="e.g. WELCOME10"
              aria-label="Discount code"
              className="min-w-0 flex-1 rounded-xl border border-brand-200 bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none transition placeholder:text-muted focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
            />
            <button
              type="button"
              onClick={onApplyDiscount}
              disabled={isApplyingDiscount || !discountCode.trim()}
              className="shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-extrabold text-brand-700 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isApplyingDiscount ? "Checking..." : "Apply"}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">Subtotal</span>
        <span className="font-bold tabular-nums text-ink">{formatPrice(totalPrice)}</span>
      </div>

      {discountAmount > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Discount</span>
          <span className="font-bold tabular-nums text-emerald-700">
            -{formatPrice(discountAmount)}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">Shipping</span>
        <span className="font-bold text-brand-400">Free</span>
      </div>

      <hr className="border-brand-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-ink">Total</span>
        <span className="font-display text-2xl font-extrabold tabular-nums text-brand-700">
          {formatPrice(finalTotalPrice)}
        </span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={isCheckingOut}
        className="mt-2 w-full rounded-full bg-brand-700 p-4 text-base font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isCheckingOut ? "Placing order..." : "Proceed to checkout"}
      </button>
    </div>
  );
}
