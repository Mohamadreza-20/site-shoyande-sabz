import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailView from "@/features/products/components/ProductDetailView";
import {
  getProduct,
  getProductReviews,
  getProducts,
  getRelatedProducts,
} from "@/features/products/api";

type ProductPageProps = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return { title: "Product not found" };

  const title = product.title;
  const socialImage = product.image;

  return {
    title,
    description: product.description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title,
      description: product.description,
      type: "website",
      url: `/products/${product.id}`,
      images: [{ url: socialImage, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: [socialImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const [reviews, relatedProducts] = await Promise.all([
    getProductReviews(id),
    getRelatedProducts(product.id, product.category, 7),
  ]);

  const productJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.description,
      image: absoluteUrl(product.image),
      category: product.category,
      sku: product.id,
      brand: { "@type": "Brand", name: SITE_NAME },
      ...(product.reviewCount > 0
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.ratingValue,
              reviewCount: product.reviewCount,
            },
          }
        : {}),
      offers: {
        "@type": "Offer",
        url: absoluteUrl(`/products/${product.id}`),
        priceCurrency: "USD",
        price: product.priceValue,
        availability:
          (product.stock ?? 1) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: product.title, path: `/products/${product.id}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={productJsonLd} />
      <Navbar />
      <ProductDetailView product={product} reviews={reviews} relatedProducts={relatedProducts} />
      <Footer />
    </>
  );
}
