"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/http";
import type { Discount } from "@/features/discounts/types";
import { getDiscounts } from "@/features/discounts/api";
import { discountIsUsable, normalizeDiscountCode, parseDiscountAmount } from "@/features/discounts/utils";
import { useCart, useCartActions } from "../context/CartContext";

export function useCartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice, syncError } = useCart();
  const { syncCart } = useCartActions();
  const [checkedOut, setCheckedOut] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const discountAmount = useMemo(
    () => (appliedDiscount ? parseDiscountAmount(appliedDiscount, totalPrice) : 0),
    [appliedDiscount, totalPrice]
  );
  const finalTotalPrice = Math.max(totalPrice - discountAmount, 0);

  const handleUpdateQuantity = useCallback(
    (id: string, quantity: number) => updateQuantity(id, quantity),
    [updateQuantity]
  );
  const handleRemove = useCallback((id: string) => removeItem(id), [removeItem]);
  const handleCheckout = useCallback(() => setCheckedOut(true), []);

  const applyDiscount = useCallback(async () => {
    const code = normalizeDiscountCode(discountCode);
    if (!code) {
      toast.error("لطفاً کد تخفیف را وارد کنید.");
      return;
    }
    if (totalPrice <= 0) {
      toast.error("برای اعمال کد تخفیف، سبد خرید نباید خالی باشد.");
      return;
    }

    setIsApplyingDiscount(true);
    try {
      const discounts = await getDiscounts();
      const discount = discounts.find((item) => normalizeDiscountCode(item.code) === code);

      if (!discount) {
        toast.error("کد تخفیف واردشده معتبر نیست.");
        setAppliedDiscount(null);
        return;
      }

      if (!discountIsUsable(discount)) {
        toast.error("این کد تخفیف فعال یا قابل استفاده نیست.");
        setAppliedDiscount(null);
        return;
      }

      const amount = parseDiscountAmount(discount, totalPrice);
      if (amount <= 0) {
        toast.error("این کد تخفیف برای سبد خرید فعلی قابل اعمال نیست.");
        setAppliedDiscount(null);
        return;
      }

      setAppliedDiscount(discount);
      setDiscountCode(discount.code);
      toast.success(`کد تخفیف «${discount.code}» اعمال شد.`);
    } catch (error) {
      toast.error(apiErrorMessage(error));
    } finally {
      setIsApplyingDiscount(false);
    }
  }, [discountCode, totalPrice]);

  const removeDiscount = useCallback(() => {
    setAppliedDiscount(null);
    setDiscountCode("");
    toast.success("کد تخفیف از سفارش حذف شد.");
  }, []);

  return {
    items,
    totalItems,
    totalPrice,
    discountAmount,
    finalTotalPrice,
    discountCode,
    appliedDiscount,
    isApplyingDiscount,
    syncError,
    syncCart,
    checkedOut,
    handleCheckout,
    handleUpdateQuantity,
    handleRemove,
    setDiscountCode,
    applyDiscount,
    removeDiscount,
  };
}
