import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryShowcase from "@/features/products/components/CategoryShowcase";
import Promo from "@/components/Promo";
import FeaturedProducts from "@/features/products/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Ingredients from "@/components/Ingredients";
import BlogSection from "@/features/blog/components/BlogSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-50">
      <Navbar />
      <main className="flex w-full flex-col">
        <Hero />
        <CategoryShowcase />
        <Promo />
        <FeaturedProducts />
        <WhyChooseUs />
        <Ingredients />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
