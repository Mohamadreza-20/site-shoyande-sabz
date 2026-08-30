import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartEmptyState() {
  return <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-6 py-24 text-center lg:px-[120px]"><span className="flex size-16 items-center justify-center rounded-full bg-brand-100"><ShoppingBag className="size-8 text-brand-400" strokeWidth={1.75} /></span><h1 className="text-2xl font-black text-brand-700">سبد خرید شما خالی است</h1><p className="max-w-[420px] text-[15px] leading-[1.7] text-muted">هنوز محصولی به سبد خریدتان اضافه نکرده‌اید. کافیست به فروشگاه سر بزنید و شوینده‌های مورد علاقه‌تان را انتخاب کنید.</p><Link href="/products" className="cursor-pointer flex items-center gap-2 rounded-full bg-brand-400 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-500"><ArrowLeft className="size-[18px]" strokeWidth={2.5} />مشاهده محصولات</Link></div>;
}
