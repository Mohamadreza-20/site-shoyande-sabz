"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { LayoutDashboard, Leaf, Menu, ShoppingBag, User } from "lucide-react";
import { useCartState } from "@/features/cart/context/CartContext";
import { useAuth } from "@/features/auth/hooks/useAuth";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const CartDrawer = dynamic(() => import("@/components/CartDrawer"), { ssr: false });

const navLinks = [
  { label: "تماس با ما", href: "/contact" },
  { label: "بلاگ", href: "/blog" },
  { label: "درباره ما", href: "/about" },
  { label: "محصولات", href: "/products" },
  { label: "خانه", href: "/" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCartState();
  const { user, hydrated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuTouched, setMobileMenuTouched] = useState(false);
  const [cartTouched, setCartTouched] = useState(false);

  const accountButton = !hydrated
    ? { label: "ورود | ثبت‌نام", href: "/auth" }
    : !user
      ? { label: "ورود | ثبت‌نام", href: "/auth" }
      : user.role === "customer"
        ? { label: "پنل کاربری", href: "/account" }
        : { label: "مدیریت", href: "/dashboard" };

  return (
    <header className="w-full border-b border-brand-200 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-[120px]">

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setCartTouched(true);
              setCartOpen(true);
            }}
            className="cursor-pointer relative flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-brand-100"
          >
            <span className="inline-block min-w-[20px] text-center tabular-nums">
              {totalItems.toLocaleString("fa-IR")}
            </span>
            <span>مورد</span>
            <ShoppingBag className="size-5" strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-brand-400 text-[10px] font-bold tabular-nums text-white">
                <span className="inline-block min-w-[14px] text-center">
                  {totalItems > 99 ? "۹۹+" : totalItems.toLocaleString("fa-IR")}
                </span>
              </span>
            )}
          </button>
          <Link
            href={accountButton.href}
            className="cursor-pointer flex items-center gap-2 rounded-full bg-brand-400 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            {user ? (
              <LayoutDashboard className="size-5" strokeWidth={2} />
            ) : (
              <User className="size-5" strokeWidth={2} />
            )}
            <span className="hidden sm:inline">{accountButton.label}</span>
          </Link>
        </div>


        <nav className="hidden items-center gap-8 text-[15px] md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const className = isActive
              ? "font-bold text-brand-500"
              : "font-medium text-muted transition hover:text-brand-500";

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`cursor-pointer ${className}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>


        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setMobileMenuTouched(true);
              setMobileMenuOpen(true);
            }}
            aria-label="باز کردن منو"
            className="cursor-pointer flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100 md:hidden"
          >
            <Menu className="size-5" strokeWidth={2} />
          </button>
          <Link href="/" className="cursor-pointer flex items-center gap-2.5">
            <span className="text-[22px] font-black text-brand-700">شست‌وشو سبز</span>
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand-400">
              <Leaf className="size-[22px] text-white" strokeWidth={2} />
            </span>
          </Link>
        </div>
      </div>

      {mobileMenuTouched && (
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navLinks={navLinks}
          activeHref={pathname}
        />
      )}
      {cartTouched && <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />}
    </header>
  );
}
