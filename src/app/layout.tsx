import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn/wght.css";
import "./globals.css";
import { Toaster } from "sonner";
import { MotionConfig } from "framer-motion";
import { CartProvider } from "@/features/cart/context/CartContext";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import QueryProvider from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shooyande-sabz.example.com"),
  title: "شست‌وشو سبز | محصولات شوینده ارگانیک",
  description:
    "خانه‌ای درخشان و سالم با قدرت شفابخش طبیعت. محصولات شوینده گیاهی و ارگانیک شست‌وشو سبز.",
  openGraph: {
    title: "شست‌وشو سبز | محصولات شوینده ارگانیک",
    description:
      "خانه‌ای درخشان و سالم با قدرت شفابخش طبیعت. محصولات شوینده گیاهی و ارگانیک شست‌وشو سبز.",
    siteName: "شست‌وشو سبز",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "شست‌وشو سبز | محصولات شوینده ارگانیک",
    description:
      "خانه‌ای درخشان و سالم با قدرت شفابخش طبیعت. محصولات شوینده گیاهی و ارگانیک شست‌وشو سبز.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        <MotionConfig reducedMotion="user">
          <QueryProvider>
            <AuthProvider>
              <CartProvider>{children}</CartProvider>
            </AuthProvider>
          </QueryProvider>
        </MotionConfig>
        <Toaster
          position="top-center"
          dir="rtl"
          richColors
          closeButton
          toastOptions={{
            style: { fontFamily: "var(--font-sans)" },
            className: "!text-right",
          }}
        />
      </body>
    </html>
  );
}
