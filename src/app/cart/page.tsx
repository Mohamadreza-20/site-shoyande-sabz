import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NO_INDEX } from "@/lib/seo";
import CartView from "@/features/cart/components/CartView";

export const metadata: Metadata = {
  title: "Shopping cart",
  robots: NO_INDEX,
  description: "Review and manage the items in your Leafwash cart.",
};

export default function CartPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex w-full flex-1 flex-col">
        <CartView />
      </main>
      <Footer />
    </div>
  );
}
