"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { LayoutDashboard, Leaf, Menu, ShoppingBag, User } from "lucide-react";
import { useCartTotalItems } from "@/features/cart/hooks/useCart";
import { useAuth } from "@/features/auth/hooks/useAuth";

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false });
const CartDrawer = dynamic(() => import("@/components/CartDrawer"), { ssr: false });

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartTotalItems();
  const { user, hydrated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuTouched, setMobileMenuTouched] = useState(false);
  const [cartTouched, setCartTouched] = useState(false);

  const accountButton = !hydrated
    ? { label: "Sign in", href: "/auth" }
    : !user
      ? { label: "Sign in", href: "/auth" }
      : user.role === "customer"
        ? { label: "My account", href: "/account" }
        : { label: "Dashboard", href: "/dashboard" };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-200/70 bg-[#f7f3e8]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-4 py-3.5 sm:px-6 lg:px-[60px]">
        <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Leafwash home">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-700">
            <Leaf className="size-[18px] text-accent" strokeWidth={2.25} />
          </span>
          <span className="font-display truncate text-xl font-extrabold text-brand-700 sm:text-2xl">
            Leaf<span className="text-brand-400">wash</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-[15px] lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const className = isActive
              ? "bg-accent text-brand-700 font-bold"
              : "font-medium text-muted transition hover:bg-brand-100 hover:text-brand-700";

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn("rounded-full px-4 py-1.5", className)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              setCartTouched(true);
              setCartOpen(true);
            }}
            aria-label={`Open cart, ${totalItems} items`}
            className="relative flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-2 text-sm font-bold text-brand-700 transition hover:bg-accent-soft sm:px-4 sm:py-2.5"
          >
            <ShoppingBag className="size-5" strokeWidth={2} />
            <span className="hidden lg:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-extrabold tabular-nums text-brand-700">
                {totalItems > 99 ? "99+" : totalItems.toLocaleString("en-US")}
              </span>
            )}
          </button>
          <Link
            href={accountButton.href}
            aria-label={accountButton.label}
            className="flex shrink-0 items-center gap-2 rounded-full bg-brand-700 px-3 py-2 text-sm font-bold text-white transition hover:bg-brand-600 sm:px-4 sm:py-2.5"
          >
            {user ? (
              <LayoutDashboard className="size-5" strokeWidth={2} />
            ) : (
              <User className="size-5" strokeWidth={2} />
            )}
            <span className="hidden lg:inline">{accountButton.label}</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuTouched(true);
              setMobileMenuOpen(true);
            }}
            aria-label="Open menu"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition hover:bg-accent-soft lg:hidden"
          >
            <Menu className="size-5" strokeWidth={2} />
          </button>
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
