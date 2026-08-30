"use client";

import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { motion } from "framer-motion";
import { Check, Info, ShoppingCart } from "lucide-react";
import { images } from "@/lib/assets";
import { heroContainer, heroItem, heroVisual } from "@/components/motion/variants";

export default function Hero() {
  return (
    <section className="w-full bg-brand-100">
      <div className="mx-auto flex max-w-[1440px] flex-col-reverse items-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-[120px] lg:py-20">

        <motion.div
          initial="hidden"
          animate="show"
          variants={heroVisual}
          className="relative h-[320px] w-full max-w-[480px] overflow-hidden rounded-[40px] border border-brand-200 bg-white lg:h-[440px]"
        >
          <SmartImage
            src={images.hero}
            alt="محصولات شوینده گیاهی شست‌وشو سبز"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
            priority
          />
          <div className="absolute bottom-6 left-6 flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 shadow-[0px_4px_12px_0px_rgba(13,62,54,0.1)]">
            <span className="text-[13px] font-bold text-brand-500">فرمولاسیون ۱۰۰٪ گیاهی</span>
            <Check className="size-3.5 text-brand-500" strokeWidth={3} />
          </div>
        </motion.div>


        <motion.div
          initial="hidden"
          animate="show"
          variants={heroContainer}
          className="flex w-full max-w-[580px] flex-col items-end gap-6 text-right"
        >
          <motion.span
            variants={heroItem}
            className="rounded-full bg-brand-300 px-4 py-1.5 text-[13px] font-bold text-brand-500"
          >
            پاک‌کننده‌های سازگار با طبیعت
          </motion.span>
          <motion.h1
            variants={heroItem}
            className="text-[32px] font-black leading-[1.25] text-brand-700 sm:text-[40px] lg:text-[48px]"
          >
            خانه‌ای درخشان و سالم با قدرت شفابخش طبیعت
          </motion.h1>
          <motion.p variants={heroItem} className="text-[17px] leading-[1.7] text-muted">
            با محصولات شوینده شست‌وشوی سبز، کثیفی‌ها را بدون استفاده از مواد شیمیایی خشن از بین
            ببرید. غنی‌شده با عصاره‌های ارگانیک گیاهی و اسانس‌های طبیعی خوش‌بو.
          </motion.p>
          <motion.div variants={heroItem} className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="cursor-pointer flex items-center gap-2 rounded-full bg-white border-[1.5px] border-brand-200 px-6 py-3.5 text-[15px] font-bold text-brand-700 transition hover:bg-brand-50"
            >
              <Info className="size-[18px]" strokeWidth={2} />
              درباره فرمولاسیون ما
            </Link>
            <Link
              href="/products"
              className="cursor-pointer flex items-center gap-2 rounded-full bg-brand-400 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-500"
            >
              <ShoppingCart className="size-[18px]" strokeWidth={2} />
              مشاهده تمام محصولات
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
