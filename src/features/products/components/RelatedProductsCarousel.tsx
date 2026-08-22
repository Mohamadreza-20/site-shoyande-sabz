"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import ProductCard from "./ProductCard";
import type { Product } from "@/features/products/types";

const AUTO_PLAY_MS = 3500;

export default function RelatedProductsCarousel({ products }: { products: Product[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (products.length === 0) return null;

  return (
    <div className="w-full">

      <Swiper
        dir="rtl"
        modules={[Autoplay, Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={16}
        loop={products.length > 1}
        autoplay={{ delay: AUTO_PLAY_MS, disableOnInteraction: false }}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="محصولات قبلی"
          className="cursor-pointer flex size-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-brand-100"
        >
          <ChevronRight className="size-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="محصولات بعدی"
          className="cursor-pointer flex size-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-brand-100"
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
