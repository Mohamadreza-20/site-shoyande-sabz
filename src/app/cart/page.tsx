import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartView from "@/features/cart/components/CartView";

export const metadata: Metadata = {
  title: "سبد خرید | شست‌وشو سبز",
  description: "مشاهده و مدیریت سبد خرید شما در فروشگاه شست‌وشو سبز.",
};

export default function CartPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-50">
      <Navbar />
      <main className="flex w-full flex-1 flex-col">
        <CartView />
      </main>
      <Footer />
    </div>
  );
}
