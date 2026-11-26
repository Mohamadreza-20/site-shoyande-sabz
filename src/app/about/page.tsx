import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkerLabel from "@/components/ui/MarkerLabel";
import DiscImage from "@/components/ui/DiscImage";
import SmartImage from "@/components/ui/SmartImage";
import CertBadges from "@/features/about/components/CertBadges";
import { aboutStats, whyUs } from "@/features/about/content";
import { images } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About us",
  description:
    "The Leafwash story: our commitment to nature and why households choose plant-based, organic cleaning products.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex w-full flex-col">
        <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-6 py-14 lg:flex-row lg:justify-between lg:px-[60px] lg:py-20">
          <div className="flex w-full max-w-[600px] flex-col items-start gap-6 text-left">
            <h1 className="text-4xl leading-[1.3] sm:text-5xl">
              <MarkerLabel>Our story</MarkerLabel>
              <span className="mt-3 block font-display font-extrabold text-brand-700">
                From the farm to your kitchen sink.
              </span>
            </h1>
            <p className="text-[17px] leading-[1.8] text-muted">
              Leafwash began with a simple idea: a spotless home should never cost your
              family&apos;s health or the planet. We gather the best plant extracts and natural
              essences to make products that clean hard and still sit easy on our conscience.
            </p>
            <p className="text-[17px] leading-[1.8] text-muted">
              Today thousands of households choose Leafwash for a bright, safe home — and we keep
              refining every formula with inspiration from nature.
            </p>
            <Link
              href="/products"
              className="mt-2 flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-600"
            >
              Shop the range
              <ArrowRight className="size-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
          <div className="relative flex w-full max-w-[520px] justify-center">
            <DiscImage
              src={images.about}
              alt="The Leafwash team preparing plant-based cleaning products"
              sizes="(max-width: 1024px) 80vw, 460px"
              className="size-[300px] sm:size-[420px]"
              priority
            />
            <DiscImage
              src={images.factory}
              alt="Organic ingredients ready for formulation"
              sizes="180px"
              tone="green"
              className="absolute -right-2 bottom-0 size-[120px] sm:right-4 sm:size-[170px]"
            />
          </div>
        </section>

        <section className="w-full bg-brand-700">
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-8 px-6 py-12 lg:grid-cols-4 lg:px-[60px]">
            {aboutStats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-start gap-1 text-left">
                <span className="font-display text-4xl font-extrabold text-accent sm:text-5xl">
                  {value}
                </span>
                <span className="text-sm text-muted-light">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[60px] lg:py-24">
          <div className="flex flex-col items-start gap-4 text-left">
            <h2 className="text-3xl sm:text-[40px]">
              <MarkerLabel>Why Leafwash?</MarkerLabel>
            </h2>
            <p className="max-w-[560px] text-base leading-[1.7] text-muted">
              Six promises behind every bottle we fill.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, index) => (
              <div key={item.title} className="flex flex-col items-start gap-3 text-left">
                <div className="relative pl-1 pt-1">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 size-10 rounded-full bg-accent"
                  />
                  <h3 className="relative pl-3 font-display text-xl font-extrabold text-brand-700">
                    <span className="mr-2 text-sm text-brand-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-[1.8] text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 lg:px-[60px]">
          <div className="relative h-[240px] w-full overflow-hidden rounded-[36px] bg-brand-600 sm:h-[340px]">
            <SmartImage
              src={images.banner1}
              alt="Lemons, herbs and botanical ingredients on a wooden table"
              fill
              sizes="(max-width: 1440px) 100vw, 1320px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-700/80 via-brand-700/30 to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-[420px] font-display text-3xl font-extrabold leading-tight text-white sm:bottom-10 sm:left-10 sm:text-5xl">
              Powerful clean.
              <span className="block text-accent">Gentle on everything else.</span>
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 lg:px-[60px] lg:py-24">
          <h2 className="text-3xl sm:text-[40px]">
            <MarkerLabel>Certified &amp; trusted</MarkerLabel>
          </h2>
          <CertBadges />
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 pb-16 lg:px-[60px]">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[36px] bg-accent p-8 sm:flex-row sm:items-center sm:p-12">
            <div className="flex max-w-[560px] flex-col gap-2 text-left">
              <h2 className="font-display text-3xl font-extrabold text-brand-700 sm:text-4xl">
                Ready for a cleaner, greener home?
              </h2>
              <p className="text-[15px] leading-[1.7] text-brand-700/80">
                Browse the full plant-based range and place your first order today.
              </p>
            </div>
            <Link
              href="/products"
              className="flex shrink-0 items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-600"
            >
              Browse products
              <ArrowRight className="size-[18px]" strokeWidth={2.5} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
