"use client";

import { CheckCircle2, Tag, X } from "lucide-react";
import { formatToman } from "../../context/CartContext";
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
}: CartSummaryProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-brand-200 bg-white p-6 lg:w-[360px] lg:shrink-0">
      <h2 className="text-right text-lg font-bold text-brand-700">خلاصه سفارش</h2>

      <div className="rounded-2xl bg-brand-50 p-4">
        <div className="mb-3 flex items-center justify-end gap-2 text-sm font-bold text-brand-700">
          <span>کد تخفیف</span>
          <Tag className="size-4" strokeWidth={2} />
        </div>
        {appliedDiscount ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-200 bg-white p-3">
            <button
              type="button"
              onClick={onRemoveDiscount}
              aria-label="حذف کد تخفیف"
              className="cursor-pointer rounded-lg p-1.5 text-muted transition hover:bg-red-50 hover:text-red-500"
            >
              <X className="size-4" />
            </button>
            <div className="flex min-w-0 items-center gap-2 text-right">
              <CheckCircle2 className="size-4 shrink-0 text-brand-500" />
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-brand-700">{appliedDiscount.code}</p>
                <p className="text-xs text-muted">{formatToman(discountAmount)} تخفیف</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onApplyDiscount}
              disabled={isApplyingDiscount || !discountCode.trim()}
              className="cursor-pointer shrink-0 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isApplyingDiscount ? "در حال بررسی..." : "اعمال"}
            </button>
            <input
              value={discountCode}
              onChange={(event) => onDiscountCodeChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onApplyDiscount();
                }
              }}
              dir="ltr"
              inputMode="text"
              autoComplete="off"
              placeholder="مثلاً WELCOME10"
              aria-label="کد تخفیف"
              className="min-w-0 flex-1 rounded-xl border border-brand-200 bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none transition placeholder:text-muted focus:border-brand-400"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-bold tabular-nums text-ink">{formatToman(totalPrice)}</span>
        <span className="text-muted">جمع کالاها</span>
      </div>

      {discountAmount > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold tabular-nums text-emerald-600">-{formatToman(discountAmount)}</span>
          <span className="text-muted">تخفیف</span>
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-brand-500">رایگان</span>
        <span className="text-muted">هزینه ارسال</span>
      </div>

      <hr className="border-brand-200" />

      <div className="flex items-center justify-between">
        <span className="text-lg font-extrabold tabular-nums text-brand-700">{formatToman(finalTotalPrice)}</span>
        <span className="text-sm font-bold text-ink">مبلغ قابل پرداخت</span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-2 w-full cursor-pointer rounded-xl bg-brand-400 p-3.5 text-base font-bold text-white transition hover:bg-brand-500"
      >
        ادامه فرآیند خرید
      </button>
    </div>
  );
}
