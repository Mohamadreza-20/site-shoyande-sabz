import { getDiscounts } from "@/features/discounts/api";
import DiscountCodeCopy from "@/features/discounts/components/DiscountCodeCopy";

export default async function Promo() {
  const discounts = await getDiscounts();
  const latest = discounts[discounts.length - 1];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-10 lg:px-[120px]">
      <div
        className="flex flex-col items-center justify-between gap-8 rounded-[28px] bg-gradient-to-l from-brand-400 to-brand-500 p-8 text-center sm:flex-row sm:text-right lg:p-10"
      >
        {latest ? (
          <DiscountCodeCopy code={latest.code} />
        ) : (
          <span className="shrink-0 rounded-full bg-white/20 px-6 py-3.5 text-sm font-bold text-white">
            به‌زودی کد تخفیف جدید
          </span>
        )}
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <span className="rounded-full bg-white/20 px-4 py-1.5 text-[13px] font-bold text-white">
            پیشنهاد ویژه این ماه
          </span>
          <h3 className="text-xl font-black text-brand-600 sm:text-[26px]">
            تا ۲۵٪ تخفیف روی اولین سفارش مواد شوینده طبیعی
          </h3>
          {latest ? (
            <p className="text-sm text-brand-600/80">فرصت محدود — با کد تخفیف: {latest.code}</p>
          ) : (
            <p className="text-sm text-brand-600/80">فرصت محدود — منتظر تخفیف‌های ما باشید</p>
          )}
        </div>
      </div>
    </section>
  );
}
