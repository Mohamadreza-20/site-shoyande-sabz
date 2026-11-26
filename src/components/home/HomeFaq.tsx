"use client";

import FaqAccordion from "@/components/ui/FaqAccordion";
import MarkerLabel from "@/components/ui/MarkerLabel";

export default function HomeFaq() {
  return (
    <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:px-[60px] lg:py-24">
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-3xl lg:text-[44px]">
          <MarkerLabel>FAQ</MarkerLabel>
        </h2>
        <p className="text-[16px] leading-[1.7] text-muted">
          Quick answers to the questions we hear most often. Need more? Our team replies within a
          day.
        </p>
      </div>
      <FaqAccordion variant="home" initialOpen={0} />
    </section>
  );
}
