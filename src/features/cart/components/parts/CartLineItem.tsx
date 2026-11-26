"use client";

import { memo } from "react";
import ProductImage from "@/features/products/components/ProductImage";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "../../utils";
import type { CartItem } from "../../types";

function RemoveButton({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Remove ${title} from cart`}
      className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-red-50 hover:text-red-500"
    >
      <Trash2 className="size-4" strokeWidth={2} />
    </button>
  );
}

const CartLineItem = memo(function CartLineItem({
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
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 rounded-[28px] border border-brand-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,47,34,0.05)] sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:gap-x-5">
      <div className="relative size-20 shrink-0 sm:size-24">
        <span
          aria-hidden
          className="absolute -bottom-1 -left-1 size-7 rounded-full bg-accent sm:size-9"
        />
        <div className="relative size-full overflow-hidden rounded-full border-4 border-[#f7f3e8] bg-brand-100">
          <ProductImage
            src={item.image}
            alt={item.title}
            fill
            sizes="96px"
            quality={40}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-col items-start gap-1 text-left">
        <p className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-brand-600">
          {item.category}
        </p>
        <p className="line-clamp-2 text-[15px] font-bold leading-snug text-ink">{item.title}</p>
        <p className="text-sm font-bold tabular-nums text-muted">
          {formatPrice(item.priceValue)} each
        </p>
        {atMaxQuantity && (
          <p className="text-xs font-semibold text-amber-700">Maximum available stock added.</p>
        )}
      </div>
      <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-start">
        <div className="flex items-center gap-1 rounded-full border border-brand-200 bg-white p-1.5">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="flex size-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition hover:bg-accent-soft"
          >
            <Minus className="size-3.5" strokeWidth={2} />
          </button>
          <span className="w-8 text-center text-sm font-bold tabular-nums text-ink">
            {item.quantity.toLocaleString("en-US")}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={atMaxQuantity}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-100"
          >
            <Plus className="size-3.5" strokeWidth={2} />
          </button>
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <p className="text-base font-extrabold tabular-nums text-brand-700">
            {formatPrice(item.priceValue * item.quantity)}
          </p>
          <RemoveButton title={item.title} onClick={() => onRemove(item.id)} />
        </div>
      </div>
      <div className="hidden items-center justify-end gap-3 sm:flex sm:w-[130px]">
        <p className="text-base font-extrabold tabular-nums text-brand-700">
          {formatPrice(item.priceValue * item.quantity)}
        </p>
        <RemoveButton title={item.title} onClick={() => onRemove(item.id)} />
      </div>
    </div>
  );
});

export default CartLineItem;
