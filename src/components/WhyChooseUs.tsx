import MarkerLabel from "@/components/ui/MarkerLabel";
import { features } from "@/lib/site-content";

export default function WhyChooseUs() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-[60px] lg:py-24">
      <div className="mb-12 flex flex-col items-start gap-4">
        <h2 className="text-3xl lg:text-[44px]">
          <MarkerLabel>Why Leafwash?</MarkerLabel>
        </h2>
        <p className="max-w-[560px] text-[16px] leading-[1.7] text-muted">
          A clean home should never cost you your health or the planet. Here is what goes into every
          bottle.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={feature.title} className="flex flex-col items-start gap-3">
            <div className="relative flex items-center">
              <span
                aria-hidden
                className="absolute -left-3 -top-2 size-11 rounded-full bg-accent"
              />
              <span className="font-display relative text-[22px] font-extrabold text-brand-700">
                <span className="mr-2 text-sm tabular-nums text-brand-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {feature.title}
              </span>
            </div>
            <p className="max-w-[360px] text-[15px] leading-[1.75] text-muted">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
