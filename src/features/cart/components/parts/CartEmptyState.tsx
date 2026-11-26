import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function CartEmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-6 py-24 text-center lg:px-[60px]">
      <span className="relative flex size-20 items-center justify-center rounded-full bg-brand-100">
        <span aria-hidden className="absolute -bottom-1 -left-1 size-8 rounded-full bg-accent" />
        <ShoppingBag className="relative size-9 text-brand-700" strokeWidth={1.75} />
      </span>
      <h1 className="font-display text-3xl font-extrabold text-brand-700">Your cart is empty</h1>
      <p className="max-w-[420px] text-[15px] leading-[1.7] text-muted">
        You haven&apos;t added anything yet. Browse the shop and pick the plant-based cleaners you
        love.
      </p>
      <Link
        href="/products"
        className="flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-600"
      >
        Shop products
        <ArrowRight className="size-[18px]" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
