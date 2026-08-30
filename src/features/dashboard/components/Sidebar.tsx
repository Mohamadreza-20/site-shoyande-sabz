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
  MessageSquare,
  Percent,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { sidebarNav } from "@/features/dashboard/constants";
import { useAuth } from "@/features/auth/hooks/useAuth";

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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  async function handleLogout() {
    await logout();
    setLogoutModalOpen(false);
    toast.success("با موفقیت از حساب خود خارج شدید.");
    router.push("/");
  }

  return (
    <aside className="flex w-full shrink-0 flex-col gap-12 bg-admin-sidebar px-5 py-10 lg:w-[280px]">

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col items-end gap-1 text-right">
          <p className="text-[22px] font-black text-white">شست‌وشو سبز</p>
          <p className="text-[11px] text-admin-accent">شوینده‌های گیاهی و ارگانیک مهد سلامت</p>
        </div>
        <span className="flex items-center justify-center rounded-2xl bg-admin-primary p-3">
          <Leaf className="size-6 text-white" strokeWidth={2} />
        </span>
      </div>


      <nav className="flex flex-col gap-2">
        {sidebarNav.map((item) => {
          const Icon = icons[item.icon];
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
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

      <LogoutConfirmModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </aside>
  );
}
