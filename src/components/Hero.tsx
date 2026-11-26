"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import DiscImage from "@/components/ui/DiscImage";
import { images } from "@/lib/assets";
import { heroContainer, heroItem, heroVisual } from "@/components/motion/variants";

export default function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-[60px] lg:pb-24 lg:pt-16">
      <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroContainer}
          className="flex w-full max-w-[640px] flex-col items-start gap-7"
        >
          <motion.div variants={heroItem} className="flex items-center gap-3">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-700">
              <Leaf className="size-7 text-accent" strokeWidth={2} />
            </span>
            <p className="font-display text-3xl font-extrabold leading-none text-brand-700 sm:text-4xl">
              LEAF
              <br />
              <span className="text-brand-400">WASH</span>
            </p>
          </motion.div>

          <motion.h1 variants={heroItem} className="flex flex-col items-start gap-3">
            <span className="font-display text-[34px] font-extrabold leading-[1.15] sm:text-5xl lg:text-[58px]">
              <span className="marker">Plant-powered cleaning,</span>
            </span>
            <span className="font-display text-[34px] font-extrabold leading-[1.15] sm:text-5xl lg:text-[58px]">
              <span className="marker">straight from organic farms.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="max-w-[520px] text-[17px] leading-[1.75] text-muted"
          >
            Refillable dish, laundry and home cleaners made with coconut-derived surfactants and
            steam-distilled essential oils. Tough on grease, gentle on everyone who lives with it.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-full bg-brand-700 px-7 py-4 text-[15px] font-bold text-white transition hover:bg-brand-600"
            >
              Shop all products
              <ArrowRight className="size-[18px]" strokeWidth={2.5} />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 rounded-full border-2 border-brand-700 px-7 py-[14px] text-[15px] font-bold text-brand-700 transition hover:bg-brand-700 hover:text-white"
            >
              Our story
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={heroVisual}
          className="relative mx-auto aspect-square w-full max-w-[320px] shrink-0 sm:max-w-[420px] lg:mx-0 lg:max-w-[520px]"
        >
          <DiscImage
            src={images.hero}
            alt="Plant-based cleaning bottles with fresh lemons and herbs"
            sizes="(max-width: 1024px) 420px, 520px"
            className="size-full"
            priority
          />
          <DiscImage
            src={images.heroSecondary}
            alt="Refill pouch beside a glass bottle"
            sizes="200px"
            tone="green"
            className="absolute -right-2 bottom-4 size-[38%] sm:-right-6"
          />
          <span className="absolute right-4 top-2 flex size-24 rotate-12 flex-col items-center justify-center rounded-full bg-brand-700 text-center text-[11px] font-bold uppercase leading-tight tracking-wide text-accent sm:size-28">
            100%
            <br />
            plant
            <br />
            based
          </span>
        </motion.div>
      </div>
    </section>
  );
}
