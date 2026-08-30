"use client";

import { useState } from "react";
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
            className={`cursor-pointer flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              isActive ? "bg-admin-primary" : "hover:bg-white/5"
            }`}
          >
            <Icon className="size-5 text-white" strokeWidth={2} />
            <span
              className={`flex-1 text-right text-sm text-white ${
                isActive ? "font-bold" : "font-normal"
              }`}
            >
              {item.label}
            </span>
            {isActive && <span className="h-4 w-1 rounded-sm bg-white" />}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await logout();
    setLogoutModalOpen(false);
    toast.success("با موفقیت از حساب خود خارج شدید.");
    router.push("/");
  }

  return (
    <>
      <div className="sticky top-0 z-30 flex w-full items-center justify-between gap-3 bg-admin-sidebar px-4 py-3.5 sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="باز کردن منوی مدیریت"
          className="cursor-pointer flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <Menu className="size-5" strokeWidth={2} />
        </button>
        <Link href="/dashboard" className="flex min-w-0 items-center gap-2">
          <span className="truncate text-base font-black text-white">شست‌وشو سبز</span>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-admin-primary">
            <Leaf className="size-[18px] text-white" strokeWidth={2} />
          </span>
        </Link>
      </div>

      <aside className="hidden w-full shrink-0 flex-col gap-12 bg-admin-sidebar px-5 py-10 lg:flex lg:w-[280px]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col items-end gap-1 text-right">
            <p className="text-[22px] font-black text-white">شست‌وشو سبز</p>
            <p className="text-[11px] text-admin-accent">شوینده‌های گیاهی و ارگانیک مهد سلامت</p>
          </div>
          <span className="flex items-center justify-center rounded-2xl bg-admin-primary p-3">
            <Leaf className="size-6 text-white" strokeWidth={2} />
          </span>
        </div>

        <SidebarNav pathname={pathname} />

        <div className="flex flex-col gap-3 rounded-2xl bg-admin-primary p-4 text-right text-white">
          <p className="text-sm font-bold">کاهش مصرف پلاستیک!</p>
          <p className="text-xs leading-[1.5] opacity-80">
            در این فصل موفق شدیم مصرف بسته‌بندی‌های پلاستیکی را تا ۴۰٪ کاهش دهیم و مواد
            زیست‌تخریب‌پذیر را جایگزین کنیم.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setLogoutModalOpen(true)}
          className="cursor-pointer flex items-center gap-3 rounded-xl px-4 py-3 text-right transition hover:bg-white/5"
        >
          <LogOut className="size-5 text-white" strokeWidth={2} />
          <span className="flex-1 text-right text-sm font-normal text-white">
            خروج از حساب کاربری
          </span>
        </button>
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
              if (e.target === e.currentTarget) setMobileOpen(false);
            }}
          >
            <motion.div
              dir="rtl"
              role="dialog"
              aria-modal="true"
              aria-label="منوی مدیریت"
              variants={drawerPanel("right")}
              className="absolute inset-y-0 right-0 flex w-[82%] max-w-[300px] flex-col gap-8 overflow-y-auto bg-admin-sidebar p-5 shadow-xl outline-none"
            >
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="بستن منو"
                  className="cursor-pointer flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <X className="size-5" strokeWidth={2} />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-white">شست‌وشو سبز</span>
                  <span className="flex size-8 items-center justify-center rounded-[10px] bg-admin-primary">
                    <Leaf className="size-[18px] text-white" strokeWidth={2} />
                  </span>
                </div>
              </div>

              <SidebarNav pathname={pathname} onNavigate={() => setMobileOpen(false)} />

              <div className="flex flex-col gap-3 rounded-2xl bg-admin-primary p-4 text-right text-white">
                <p className="text-sm font-bold">کاهش مصرف پلاستیک!</p>
                <p className="text-xs leading-[1.5] opacity-80">
                  در این فصل موفق شدیم مصرف بسته‌بندی‌های پلاستیکی را تا ۴۰٪ کاهش دهیم و مواد
                  زیست‌تخریب‌پذیر را جایگزین کنیم.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setLogoutModalOpen(true);
                }}
                className="cursor-pointer flex items-center gap-3 rounded-xl px-4 py-3 text-right transition hover:bg-white/5"
              >
                <LogOut className="size-5 text-white" strokeWidth={2} />
                <span className="flex-1 text-right text-sm font-normal text-white">
                  خروج از حساب کاربری
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoutConfirmModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
