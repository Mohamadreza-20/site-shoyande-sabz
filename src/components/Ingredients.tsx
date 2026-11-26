import { Check } from "lucide-react";
import DiscImage from "@/components/ui/DiscImage";
import MarkerLabel from "@/components/ui/MarkerLabel";
import { images } from "@/lib/assets";
import { ingredientBullets } from "@/lib/site-content";

export default function Ingredients() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:justify-between lg:gap-20 lg:px-[60px] lg:py-24">
      <DiscImage
        src={images.ingredients}
        alt="Lemons, lavender and tea tree leaves on a wooden table"
        sizes="(max-width: 1024px) 340px, 480px"
        className="size-[300px] sm:size-[400px] lg:size-[480px]"
      />

      <div className="flex w-full max-w-[600px] flex-col items-start gap-6">
        <h2 className="text-3xl leading-tight lg:text-[44px]">
          <MarkerLabel>Nature does the heavy lifting</MarkerLabel>
        </h2>
        <p className="text-[16px] leading-[1.8] text-muted">
          Our formulas pair plant oils with gentle fruit acids. You get powerful disinfecting action
          without damaging your surfaces or your hands.
        </p>
        <ul className="flex w-full flex-col gap-4">
          {ingredientBullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-700">
                <Check className="size-3.5 text-accent" strokeWidth={3} />
              </span>
              <span className="text-[15px] font-medium leading-relaxed text-ink">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
