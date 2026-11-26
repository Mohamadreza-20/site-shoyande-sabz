"use client";

import { StaleDataNotice } from "@/components/ui/StaleDataNotice";
import MarkerLabel from "@/components/ui/MarkerLabel";
import CartLineItem from "./parts/CartLineItem";
import CartEmptyState from "./parts/CartEmptyState";
import CartCheckoutSuccess from "./parts/CartCheckoutSuccess";
import CartSummary from "./parts/CartSummary";
import { useCartPage } from "../hooks/useCartPage";

export default function CartView() {
  const cart = useCartPage();
  if (cart.items.length === 0 && !cart.checkedOut) return <CartEmptyState />;
  if (cart.checkedOut) return <CartCheckoutSuccess />;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-[60px] lg:py-14">
      <h1 className="mb-8 text-3xl leading-tight lg:text-[40px]">
        <MarkerLabel>Your cart</MarkerLabel>{" "}
        <span className="font-display text-lg font-bold text-muted">
          ({cart.totalItems.toLocaleString("en-US")} {cart.totalItems === 1 ? "item" : "items"})
        </span>
      </h1>
      {cart.syncError && (
        <div className="mb-6">
          <StaleDataNotice
            variant="storefront"
            message="We couldn't refresh stock and prices, so what you see may be out of date."
            onRetry={cart.syncCart}
          />
        </div>
      )}
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="flex w-full flex-1 flex-col gap-4">
          {cart.items.map((item) => (
            <CartLineItem
              key={item.id}
              item={item}
              onUpdateQuantity={cart.handleUpdateQuantity}
              onRemove={cart.handleRemove}
            />
          ))}
        </div>
        <CartSummary
          totalPrice={cart.totalPrice}
          discountAmount={cart.discountAmount}
          finalTotalPrice={cart.finalTotalPrice}
          discountCode={cart.discountCode}
          appliedDiscount={cart.appliedDiscount}
          isApplyingDiscount={cart.isApplyingDiscount}
          onDiscountCodeChange={cart.setDiscountCode}
          onApplyDiscount={cart.applyDiscount}
          onRemoveDiscount={cart.removeDiscount}
          onCheckout={cart.handleCheckout}
          isCheckingOut={cart.isCheckingOut}
        />
      </div>
    </div>
  );
}
