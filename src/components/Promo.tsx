import { getDiscounts } from "@/features/discounts/api";
import DiscountCodeCopy from "@/features/discounts/components/DiscountCodeCopy";

export default async function Promo() {
  const discounts = await getDiscounts();
  const latest = discounts[discounts.length - 1];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-10 lg:px-[60px]">
      <div className="flex flex-col items-center justify-between gap-8 rounded-[32px] bg-accent p-8 text-center sm:flex-row-reverse sm:text-left lg:p-10">
        {latest ? (
          <DiscountCodeCopy code={latest.code} />
        ) : (
          <span className="shrink-0 rounded-full bg-brand-700 px-6 py-3.5 text-sm font-bold text-white">
            New code coming soon
          </span>
        )}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <span className="rounded-full bg-brand-700 px-4 py-1.5 text-[13px] font-bold text-accent">
            This month only
          </span>
          <h3 className="text-xl font-display font-extrabold text-brand-700 sm:text-[26px]">
            Up to 25% off your first natural cleaning order
          </h3>
          {latest ? (
            <p className="text-sm text-brand-700/80">
              Limited time. Use code {latest.code} at checkout.
            </p>
          ) : (
            <p className="text-sm text-brand-700/80">
              Limited time. Stay tuned for our next offer.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
