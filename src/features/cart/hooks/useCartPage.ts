"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/http";
import type { Discount } from "@/features/discounts/types";
import { orderKeys } from "@/features/orders/queryKeys";
import { getDiscounts } from "@/features/discounts/api";
import {
  discountIsUsable,
  normalizeDiscountCode,
  parseDiscountAmount,
} from "@/features/discounts/utils";
import { useCart, useCartActions } from "./useCart";

export function useCartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice, syncError } =
    useCart();
  const { syncCart } = useCartActions();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [checkedOut, setCheckedOut] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
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
  const handleCheckout = useCallback(async () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
          discountCode: appliedDiscount?.code,
        }),
      });
      if (res.status === 401) {
        toast.error("Please sign in to place your order.");
        router.push("/auth?callbackUrl=%2Fcart");
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        toast.error(data?.error ?? "We couldn't place your order. Please try again.");
        return;
      }
      await queryClient.invalidateQueries({ queryKey: orderKeys.all });
      setCheckedOut(true);
      clearCart();
      window.scrollTo({ top: 0 });
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }, [appliedDiscount, clearCart, isCheckingOut, items, queryClient, router]);

  const applyDiscount = useCallback(async () => {
    const code = normalizeDiscountCode(discountCode);
    if (!code) {
      toast.error("Please enter a discount code.");
      return;
    }
    if (totalPrice <= 0) {
      toast.error("Add something to your cart before applying a discount code.");
      return;
    }

    setIsApplyingDiscount(true);
    try {
      const discounts = await getDiscounts();
      const discount = discounts.find((item) => normalizeDiscountCode(item.code) === code);

      if (!discount) {
        toast.error("That discount code is not valid.");
        setAppliedDiscount(null);
        return;
      }

      if (!discountIsUsable(discount)) {
        toast.error("This discount code is inactive or can no longer be used.");
        setAppliedDiscount(null);
        return;
      }

      const amount = parseDiscountAmount(discount, totalPrice);
      if (amount <= 0) {
        toast.error("This discount code does not apply to your current cart.");
        setAppliedDiscount(null);
        return;
      }

      setAppliedDiscount(discount);
      setDiscountCode(discount.code);
      toast.success(`Discount code "${discount.code}" applied.`);
    } catch (error) {
      toast.error(apiErrorMessage(error));
    } finally {
      setIsApplyingDiscount(false);
    }
  }, [discountCode, totalPrice]);

  const removeDiscount = useCallback(() => {
    setAppliedDiscount(null);
    setDiscountCode("");
    toast.success("Discount code removed.");
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
    isCheckingOut,
    handleCheckout,
    handleUpdateQuantity,
    handleRemove,
    setDiscountCode,
    applyDiscount,
    removeDiscount,
  };
}
