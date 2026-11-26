import Link from "next/link";
import { ArrowRight, PackageCheck } from "lucide-react";

export default function CartCheckoutSuccess() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-6 py-24 text-center lg:px-[60px]">
      <span className="flex size-20 items-center justify-center rounded-full bg-accent">
        <PackageCheck className="size-9 text-brand-700" strokeWidth={1.75} />
      </span>
      <h1 className="font-display text-3xl font-extrabold text-brand-700">Order placed!</h1>
      <p className="max-w-[420px] text-[15px] leading-[1.7] text-muted">
        Thank you for shopping with Leafwash. We&apos;ll be in touch shortly with your delivery
        details.
      </p>
      <Link
        href="/products"
        className="flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-600"
      >
        Keep shopping
        <ArrowRight className="size-[18px]" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
