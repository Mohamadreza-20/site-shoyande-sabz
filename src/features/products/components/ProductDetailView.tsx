import Link from "next/link";
import { Suspense } from "react";
import { Check, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import ProductImage from "@/features/products/components/ProductImage";
import ProductActions from "@/features/products/components/ProductActions";
import ProductReviews from "@/features/products/components/ProductReviews";
import RelatedProductsCarousel from "@/features/products/components/RelatedProductsCarousel";
import type { Product, Review } from "@/features/products/types";

const RATING_STAR_IDS = ["rating-star-1", "rating-star-2", "rating-star-3", "rating-star-4", "rating-star-5"] as const;

const trustBadges = [
  { icon: Truck, label: "ارسال سریع", text: "ارسال طی ۲۴ تا ۴۸ ساعت در سراسر کشور" },
  { icon: RotateCcw, label: "بازگشت آسان", text: "۷ روز فرصت بازگشت کالا بدون قید و شرط" },
  { icon: ShieldCheck, label: "ضمانت اصالت", text: "۱۰۰٪ اورجینال و تأییدشده توسط تیم کیفیت" },
] as const;

type ProductDetailViewProps = {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
  fetchedAt: number;
};

function ProductRating({ value, reviewCount }: { value: number; reviewCount: number }) {
  const filledStars = Math.round(value);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-ink">{value}</span>
      <div className="flex items-center" aria-label={`امتیاز ${value} از ۵`}>
        {RATING_STAR_IDS.map((id, position) => (
          <Star
            key={id}
            className={
              position < filledStars
                ? "size-4 fill-amber-400 text-amber-400"
                : "size-4 text-brand-200"
            }
          />
        ))}
      </div>
      <span className="text-sm text-muted">({reviewCount.toLocaleString("fa-IR")} نظر)</span>
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      {trustBadges.map(({ icon: Icon, label, text }) => (
        <div
          key={label}
          className="flex flex-col items-end gap-2 rounded-2xl border border-brand-200 bg-white p-4 text-right"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand-300">
            <Icon className="size-4 text-brand-700" strokeWidth={1.75} />
          </span>
          <p className="text-xs font-bold text-ink">{label}</p>
          <p className="text-[11px] leading-[1.5] text-muted">{text}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProductDetailView({
  product,
  reviews,
  relatedProducts,
  fetchedAt,
}: ProductDetailViewProps) {
  const discountPercent =
    product.oldPriceValue && product.oldPriceValue > product.priceValue
      ? Math.round(((product.oldPriceValue - product.priceValue) / product.oldPriceValue) * 100)
      : null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-50">
      <main className="flex w-full flex-col">
        <section className="mx-auto w-full max-w-[1440px] px-6 py-8 lg:px-[120px] lg:py-12">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition hover:text-brand-500">خانه</Link>
            <span>/</span>
            <Link href="/products" className="transition hover:text-brand-500">محصولات</Link>
            <span>/</span>
            <span className="line-clamp-1 font-bold text-brand-700">{product.title}</span>
          </div>

          <div className="flex flex-col items-start gap-12 lg:flex-row lg:justify-between">
            <div className="relative h-[320px] w-full overflow-hidden rounded-[40px] border border-brand-200 bg-white lg:h-[480px] lg:max-w-[520px]">
              <ProductImage
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                priority
                className="object-cover"
              />
              {discountPercent !== null && (
                <div className="absolute right-6 top-6 rounded-full bg-white/95 px-4 py-2 shadow-[0px_4px_12px_0px_rgba(13,62,54,0.1)]">
                  <span className="text-[13px] font-bold text-brand-500">
                    {discountPercent.toLocaleString("fa-IR")}٪ تخفیف
                  </span>
                </div>
              )}
            </div>

            <div className="flex w-full max-w-[580px] flex-col items-end gap-5 text-right">
              <span className="rounded-full bg-brand-300 px-4 py-1.5 text-[13px] font-bold text-brand-500">
                {product.category}
              </span>
              <h1 className="text-[26px] font-black leading-[1.35] text-brand-700 sm:text-[32px]">
                {product.title}
              </h1>
              <ProductRating value={product.ratingValue} reviewCount={product.reviewCount} />
              <div className="flex items-center gap-3">
                {product.oldPrice && (
                  <span className="text-base text-muted line-through">{product.oldPrice}</span>
                )}
                <span className="text-[28px] font-extrabold text-brand-700">{product.price}</span>
              </div>
              <p className="text-[15px] leading-[1.8] text-muted">{product.description}</p>
              <ProductActions product={product} />
              <TrustBadges />
            </div>
          </div>
        </section>

        <section className="w-full bg-brand-100">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-[120px] lg:py-16">
            <div className="flex w-full max-w-[560px] flex-col items-end gap-5 text-right">
              <h2 className="text-2xl font-black text-brand-700">ویژگی‌های محصول</h2>
              <ul className="flex w-full flex-col gap-4">
                {product.highlights.map((point) => (
                  <li key={point} className="flex w-full items-center justify-end gap-3">
                    <span className="text-[15px] font-medium text-ink">{point}</span>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-xl bg-brand-300">
                      <Check className="size-3.5 text-brand-500" strokeWidth={3} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-full max-w-[560px] flex-col items-end gap-4 rounded-[28px] border border-brand-200 bg-white p-8 text-right">
              <h2 className="text-2xl font-black text-brand-700">روش استفاده</h2>
              <p className="text-[15px] leading-[1.8] text-muted">{product.usage}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[120px] lg:py-20">
          <Suspense fallback={null}>
            <ProductReviews productId={product.id} initialReviews={reviews} fetchedAt={fetchedAt} />
          </Suspense>
        </section>

        {relatedProducts.length > 0 && (
          <section className="w-full bg-brand-100">
            <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[120px] lg:py-20">
              <h2 className="mb-8 text-right text-2xl font-black text-brand-700 lg:text-[28px]">محصولات مشابه</h2>
              <RelatedProductsCarousel products={relatedProducts} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
