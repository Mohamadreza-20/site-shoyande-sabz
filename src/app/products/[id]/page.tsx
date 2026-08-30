import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailView from "@/features/products/components/ProductDetailView";
import { getProduct, getProductReviews, getProducts, getRelatedProducts } from "@/features/products/api";

type ProductPageProps = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return { title: "محصول یافت نشد | شست‌وشو سبز" };

  const title = `${product.title} | شست‌وشو سبز`;
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
    twitter: { card: "summary_large_image", title, description: product.description, images: [socialImage] },
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

  return (
    <>
      <Navbar />
      <ProductDetailView
        product={product}
        reviews={reviews}
        relatedProducts={relatedProducts}
        fetchedAt={Date.now()}
      />
      <Footer />
    </>
  );
}
