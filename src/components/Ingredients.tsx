import { Check } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { images } from "@/lib/assets";
import { ingredientBullets } from "@/lib/site-content";

export default function Ingredients() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-[120px] lg:py-20">
      <div className="relative h-[320px] w-full max-w-[520px] overflow-hidden rounded-[32px] lg:h-[440px]">
        <SmartImage
          src={images.ingredients}
          alt="مواد اولیه طبیعی و ارگانیک"
          fill
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-cover"
        />
      </div>

      <div className="flex w-full max-w-[580px] flex-col items-end gap-6 text-right">
        <span className="rounded-full bg-brand-300 px-4 py-1.5 text-[13px] font-bold text-brand-500">
          مواد اولیه از قلب مزارع ارگانیک
        </span>
        <h2 className="text-2xl font-black leading-tight text-brand-700 sm:text-[32px]">
          عصاره‌های طبیعی کارساز در مقابل سخت‌ترین لکه‌ها
        </h2>
        <p className="text-[16px] leading-[1.7] text-muted">
          فرمولاسیون نوآورانه ما حاصل ترکیب روغن‌های گیاهی با اسیدهای طبیعی میوه‌هاست که علاوه بر
          قدرت گندزدایی بالا، به سطوح و دستان شما صدمه نمی‌زنند.
        </p>
        <ul className="flex w-full flex-col gap-4">
          {ingredientBullets.map((bullet) => (
            <li key={bullet} className="flex w-full items-center justify-end gap-3">
              <span className="text-[15px] font-medium text-ink">{bullet}</span>
              <span className="flex size-6 shrink-0 items-center justify-center rounded-xl bg-brand-300">
                <Check className="size-3.5 text-brand-500" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
