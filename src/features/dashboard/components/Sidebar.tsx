"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  Grid2x2,
  Home,
  Leaf,
  LogOut,
  Menu,
  MessageSquare,
  Percent,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { sidebarNav } from "@/features/dashboard/constants";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { drawerBackdrop, drawerPanel } from "@/components/motion/variants";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useOverlay } from "@/lib/hooks/useOverlay";

const LogoutConfirmModal = dynamic(() => import("@/components/LogoutConfirmModal"), {
  ssr: false,
});

const icons = {
  home: Home,
  leaf: Leaf,
  shoppingBag: ShoppingBag,
  grid: Grid2x2,
  users: Users,
  percent: Percent,
  barChart: BarChart3,
  settings: Settings,
  messageSquare: MessageSquare,
  fileText: FileText,
} as const;

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-2">
      {sidebarNav.map((item) => {
        const Icon = icons[item.icon];
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`relative flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              isActive ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            {isActive && (
              <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-admin-accent" />
            )}
            <Icon
              className={`size-5 ${isActive ? "text-admin-accent" : "text-white/80"}`}
              strokeWidth={2}
            />
            <span
              className={`flex-1 text-left text-sm text-white ${
                isActive ? "font-bold" : "font-normal text-white/80"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarPromo() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-brand-600 p-4 text-white">
      <p className="font-display text-sm font-bold text-admin-accent">Less plastic, more planet</p>
      <p className="text-xs leading-[1.5] opacity-80">
        This season we cut plastic packaging by 40% and replaced it with biodegradable materials.
      </p>
    </div>
  );
}

function SignOutButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-white/5"
    >
      <LogOut className="size-5 text-white" strokeWidth={2} />
      <span className="flex-1 text-left text-sm font-normal text-white">Sign out</span>
    </button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const drawerRef = useFocusTrap(mobileOpen);

  useOverlay(mobileOpen, closeMobile);

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    setLogoutModalOpen(false);
    toast.success("You have been signed out.");
    router.push("/");
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex w-full items-center justify-between gap-3 bg-admin-sidebar px-4 py-3.5 sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open admin menu"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <Menu className="size-5" strokeWidth={2} />
        </button>
        <Link href="/dashboard" className="flex min-w-0 items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-admin-accent">
            <Leaf className="size-[18px] text-brand-700" strokeWidth={2} />
          </span>
          <span className="font-display truncate text-base font-extrabold text-white">
            Leafwash
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setLogoutModalOpen(true)}
          aria-label="Sign out"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <LogOut className="size-[18px]" strokeWidth={2} />
        </button>
      </header>

      <aside className="fixed inset-y-0 left-0 z-30 hidden h-dvh w-[280px] flex-col gap-8 overflow-y-auto bg-admin-sidebar px-5 py-8 lg:flex">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center rounded-2xl bg-admin-accent p-3">
            <Leaf className="size-6 text-brand-700" strokeWidth={2} />
          </span>
          <div className="flex flex-col gap-0.5">
            <p className="font-display text-[22px] font-extrabold text-white">Leafwash</p>
            <p className="text-[11px] text-admin-accent">Plant-based cleaning, admin</p>
          </div>
        </div>

        <SidebarNav pathname={pathname} />
        <SidebarPromo />
        <SignOutButton onClick={() => setLogoutModalOpen(true)} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={drawerBackdrop}
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeMobile();
            }}
          >
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Admin menu"
              tabIndex={-1}
              variants={drawerPanel("left")}
              className="absolute inset-y-0 left-0 flex w-[82%] max-w-[300px] flex-col gap-6 overflow-y-auto overscroll-contain bg-admin-sidebar p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl outline-none"
            >
              <div className="flex shrink-0 items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-[10px] bg-admin-accent">
                    <Leaf className="size-[18px] text-brand-700" strokeWidth={2} />
                  </span>
                  <span className="font-display text-base font-extrabold text-white">Leafwash</span>
                </div>
                <button
                  type="button"
                  onClick={closeMobile}
                  aria-label="Close menu"
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <X className="size-5" strokeWidth={2} />
                </button>
              </div>

              <SidebarNav pathname={pathname} onNavigate={closeMobile} />

              <div className="mt-auto flex shrink-0 flex-col gap-3">
                <div className="hidden [@media(min-height:720px)]:block">
                  <SidebarPromo />
                </div>
                <SignOutButton
                  onClick={() => {
                    closeMobile();
                    setLogoutModalOpen(true);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutConfirmModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
        loading={loggingOut}
      />
    </>
  );
}
