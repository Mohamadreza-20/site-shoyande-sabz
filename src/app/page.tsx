import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryShowcase from "@/features/products/components/CategoryShowcase";
import Promo from "@/components/Promo";
import FeaturedProducts from "@/features/products/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Ingredients from "@/components/Ingredients";
import BlogSection from "@/features/blog/components/BlogSection";
import Footer from "@/components/Footer";
import PhotoBanner from "@/components/home/PhotoBanner";
import Certificates from "@/components/home/Certificates";
import HomeFaq from "@/components/home/HomeFaq";
import SampleCta from "@/components/home/SampleCta";
import { images } from "@/lib/assets";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex w-full flex-col">
        <Hero />
        <CategoryShowcase />
        <FeaturedProducts />
        <PhotoBanner
          src={images.banner1}
          eyebrow="New arrival"
          title="High-quality refillable dish soap"
          href="/products"
          cta="Shop dish soap"
        />
        <WhyChooseUs />
        <Ingredients />
        <Promo />
        <Certificates />
        <PhotoBanner
          src={images.banner2}
          eyebrow="Refill & save"
          title="Refill pouches use 80% less plastic"
          href="/products"
          cta="Browse refills"
        />
        <BlogSection />
        <HomeFaq />
        <SampleCta />
      </main>
      <Footer />
      <JsonLd data={homeJsonLd} />
    </div>
  );
}
