"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Check, Leaf, PawPrint, Recycle, Star } from "lucide-react";
import ProductImage from "@/features/products/components/ProductImage";
import ProductActions from "@/features/products/components/ProductActions";
import ProductReviews from "@/features/products/components/ProductReviews";
import FaqAccordion from "@/components/ui/FaqAccordion";
import MarkerLabel from "@/components/ui/MarkerLabel";
import { useProduct } from "@/features/products/hooks";
import { formatPrice } from "@/lib/money";
import type { Product, Review } from "@/features/products/types";

const RelatedProductsCarousel = dynamic(
  () => import("@/features/products/components/RelatedProductsCarousel"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[360px] w-full animate-pulse rounded-[28px] bg-brand-100" aria-hidden />
    ),
  }
);

const trustBadges = [
  { icon: PawPrint, label: "Cruelty-free", text: "Never tested on animals" },
  { icon: Leaf, label: "Plant-based", text: "Botanical, biodegradable formula" },
  { icon: Recycle, label: "Recyclable bottle", text: "Made from recycled plastic" },
] as const;

const faqs = [
  {
    q: "Is it safe for kids and pets?",
    a: "Our formulas are free from chlorine, formaldehyde and harsh solvents. As with any cleaner, keep the bottle out of reach and rinse surfaces that touch food.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders ship within 24 to 48 hours. Delivery usually takes 3 to 5 working days depending on your location.",
  },
  {
    q: "Can I return an opened bottle?",
    a: "Yes. If you're not happy, contact us within 14 days and we'll make it right, even if the bottle has been opened.",
  },
] as const;

type ProductDetailViewProps = {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
  fetchedAt?: number;
};

function ProductRating({ value, reviewCount }: { value: number; reviewCount: number }) {
  const filledStars = Math.round(value);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center" role="img" aria-label={`Rated ${value} out of 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={
              index < filledStars ? "size-4 fill-accent text-accent" : "size-4 text-brand-200"
            }
          />
        ))}
      </div>
      <span className="text-sm font-bold text-ink">
        {value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
      </span>
      <span className="text-sm text-muted">
        ({reviewCount.toLocaleString("en-US")} {reviewCount === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      {trustBadges.map(({ icon: Icon, label, text }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-white p-3 text-left sm:flex-col sm:items-start sm:gap-2 sm:p-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-700">
            <Icon className="size-[18px] text-accent" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-extrabold text-ink">{label}</p>
            <p className="text-xs leading-[1.5] text-muted">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductFaq() {
  return <FaqAccordion variant="product" items={faqs} />;
}

export default function ProductDetailView({
  product: initialProduct,
  reviews,
  relatedProducts,
  fetchedAt,
}: ProductDetailViewProps) {
  const { data: product = initialProduct } = useProduct(
    initialProduct.id,
    initialProduct,
    fetchedAt
  );

  const discountPercent =
    product.oldPriceValue && product.oldPriceValue > product.priceValue
      ? Math.round(((product.oldPriceValue - product.priceValue) / product.oldPriceValue) * 100)
      : null;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex w-full flex-col">
        <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-[60px] lg:py-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted"
          >
            <Link href="/" className="transition hover:text-brand-700">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="transition hover:text-brand-700">
              Products
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-bold text-brand-700">{product.title}</span>
          </nav>

          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="relative aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[500px]">
              <span
                aria-hidden
                className="absolute -bottom-[4%] -left-[4%] size-[44%] rounded-full bg-accent"
              />
              <span
                aria-hidden
                className="absolute -right-[3%] -top-[3%] size-[22%] rounded-full bg-brand-400/25"
              />
              <div className="relative size-full overflow-hidden rounded-full border-[8px] border-[#f7f3e8] bg-brand-100 shadow-[0_20px_50px_rgba(15,47,34,0.2)]">
                <ProductImage
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 80vw, 500px"
                  priority
                  className="object-cover"
                />
              </div>
              {discountPercent !== null && (
                <div className="absolute right-2 top-6 rounded-full bg-brand-700 px-4 py-2 shadow-lg sm:right-0">
                  <span className="text-[13px] font-extrabold text-accent">
                    {discountPercent.toLocaleString("en-US")}% off
                  </span>
                </div>
              )}
            </div>

            <div className="flex w-full max-w-[600px] flex-col items-start gap-5 text-left">
              <span className="rounded-full bg-accent-soft px-4 py-1.5 text-[13px] font-bold text-brand-600">
                {product.category}
              </span>
              <h1 className="text-[30px] leading-[1.2] sm:text-[40px]">
                <MarkerLabel className="!font-extrabold">{product.title}</MarkerLabel>
              </h1>
              <ProductRating value={product.ratingValue} reviewCount={product.reviewCount} />
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[34px] font-extrabold text-brand-700">
                  {formatPrice(product.priceValue)}
                </span>
                {product.oldPriceValue ? (
                  <span className="text-lg text-muted line-through">
                    {formatPrice(product.oldPriceValue)}
                  </span>
                ) : null}
              </div>
              <p className="text-[15px] leading-[1.8] text-muted">{product.description}</p>
              <ProductActions product={product} />
              <TrustBadges />
            </div>
          </div>
        </section>

        <section className="w-full bg-brand-100">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-[60px] lg:py-16">
            <div className="flex w-full max-w-[560px] flex-col items-start gap-5 text-left">
              <h2 className="text-2xl lg:text-3xl">
                <MarkerLabel>What&apos;s inside</MarkerLabel>
              </h2>
              <ul className="flex w-full flex-col gap-4">
                {product.highlights.map((point) => (
                  <li key={point} className="flex w-full items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-700">
                      <Check className="size-3.5 text-accent" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] font-medium text-ink">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-full max-w-[560px] flex-col items-start gap-4 rounded-[28px] border border-brand-200 bg-white p-8 text-left shadow-[0_8px_24px_rgba(15,47,34,0.05)]">
              <h2 className="font-display text-2xl font-extrabold text-brand-700">How to use</h2>
              <p className="text-[15px] leading-[1.8] text-muted">{product.usage}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-[60px] lg:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <div className="flex w-full flex-col items-start gap-5 lg:max-w-[380px]">
              <h2 className="text-2xl lg:text-3xl">
                <MarkerLabel>Good to know</MarkerLabel>
              </h2>
              <p className="text-[15px] leading-[1.8] text-muted">
                Quick answers to what shoppers ask us most about this product.
              </p>
            </div>
            <ProductFaq />
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-[60px] lg:pb-20">
          <Suspense fallback={null}>
            <ProductReviews productId={product.id} initialReviews={reviews} fetchedAt={fetchedAt} />
          </Suspense>
        </section>

        {relatedProducts.length > 0 && (
          <section className="w-full bg-brand-100">
            <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-[60px] lg:py-20">
              <h2 className="mb-8 text-2xl lg:text-3xl">
                <MarkerLabel>You may also like</MarkerLabel>
              </h2>
              <RelatedProductsCarousel products={relatedProducts} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
