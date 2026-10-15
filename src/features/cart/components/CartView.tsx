"use client";

import { StaleDataNotice } from "@/components/ui/StaleDataNotice";
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
		<div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-[120px] lg:py-14">
			<h1 className="mb-8 text-right text-2xl font-black text-brand-700 lg:text-[28px]">
				سبد خرید (
				<span className="tabular-nums">
					{cart.totalItems.toLocaleString("fa-IR")}
				</span>{" "}
				کالا)
			</h1>
			{cart.syncError && (
				<div className="mb-6">
					<StaleDataNotice
						variant="storefront"
						message="به‌روزرسانی موجودی و قیمت انجام نشد؛ اطلاعات نمایش داده‌شده ممکن است قدیمی باشد."
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
				/>
			</div>
		</div>
	);
}
