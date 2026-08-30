"use client";

import { memo } from "react";
import ProductImage from "@/features/products/components/ProductImage";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatToman, type CartItem } from "../../context/CartContext";

const CartLineItem = memo(function CartLineItem({ item, onUpdateQuantity, onRemove }: { item: CartItem; onUpdateQuantity: (id: string, quantity: number) => void; onRemove: (id: string) => void }) {
  const quantityCap = typeof item.stock === "number" ? Math.min(item.stock, 99) : 99;
  const atMaxQuantity = item.quantity >= quantityCap;
  return <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-200 bg-white p-4 sm:flex-row">
    <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-brand-50"><ProductImage src={item.image} alt={item.title} fill sizes="96px" quality={40} className="object-cover" /></div>
    <div className="flex w-full flex-1 flex-col items-end gap-1 text-right"><p className="text-xs font-medium text-brand-500">{item.category}</p><p className="line-clamp-1 text-[15px] font-bold text-ink">{item.title}</p><p className="text-sm font-bold tabular-nums text-brand-700">{formatToman(item.priceValue)}</p>{atMaxQuantity && <p className="text-xs font-semibold text-amber-600">حداکثر موجودی این محصول اضافه شده است.</p>}</div>
    <div className="flex items-center gap-3 rounded-full border border-brand-200 bg-white px-2 py-2">
      <button type="button" aria-label="افزایش تعداد" disabled={atMaxQuantity} onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="cursor-pointer flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-50"><Plus className="size-3.5" strokeWidth={2} /></button>
      <span className="min-w-[20px] text-center text-sm font-bold tabular-nums text-ink">{item.quantity.toLocaleString("fa-IR")}</span>
      <button type="button" aria-label="کاهش تعداد" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="cursor-pointer flex size-7 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100"><Minus className="size-3.5" strokeWidth={2} /></button>
    </div>
    <div className="flex w-full shrink-0 items-center justify-between gap-4 sm:w-[170px] sm:flex-col sm:items-end sm:gap-2"><p className="w-full text-left text-sm font-extrabold tabular-nums text-brand-700 sm:text-right">{formatToman(item.priceValue * item.quantity)}</p><button type="button" onClick={() => onRemove(item.id)} aria-label="حذف از سبد خرید" className="cursor-pointer flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-red-50 hover:text-red-500"><Trash2 className="size-4" strokeWidth={2} /></button></div>
  </div>;
});

export default CartLineItem;
