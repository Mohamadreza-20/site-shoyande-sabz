import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export default function SampleCta() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-[60px]">
      <div className="relative overflow-hidden rounded-[36px] bg-brand-700 px-6 py-12 text-center sm:px-12 lg:py-16">
        <Leaf aria-hidden className="absolute -left-8 -top-8 size-48 rotate-12 text-white/[0.06]" />
        <Leaf
          aria-hidden
          className="absolute -bottom-10 -right-6 size-56 -rotate-12 text-white/[0.06]"
        />
        <div className="relative mx-auto flex max-w-[640px] flex-col items-center gap-5">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-[44px]">
            Not sure where to start? <span className="text-accent">Ask for a sample.</span>
          </h2>
          <p className="text-[16px] leading-[1.7] text-brand-200">
            Tell us about your home and we will send a trial pack of the formulas that fit it best.
          </p>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-[15px] font-extrabold text-brand-700 transition hover:brightness-95"
          >
            Request a sample
            <ArrowRight className="size-[18px]" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
