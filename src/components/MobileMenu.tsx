"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { drawerBackdrop, drawerPanel } from "@/components/motion/variants";
import { useFocusTrap } from "@/lib/useFocusTrap";

type NavLink = { label: string; href: string };

export default function MobileMenu({
  open,
  onClose,
  navLinks,
  activeHref,
}: {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  activeHref: string;
}) {
  const panelRef = useFocusTrap(open);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={drawerBackdrop}
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-label="منوی موبایل"
            tabIndex={-1}
            variants={drawerPanel("right")}
            className="absolute inset-y-0 right-0 flex w-[80%] max-w-[320px] flex-col gap-2 bg-white p-6 shadow-xl outline-none"
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن منو"
                className="cursor-pointer flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100"
              >
                <X className="size-5" strokeWidth={2} />
              </button>
              <span className="text-base font-black text-brand-700">منو</span>
            </div>

            <nav className="flex flex-col items-end gap-1 text-right">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`cursor-pointer w-full rounded-xl px-3 py-3 text-[15px] transition ${
                      isActive
                        ? "bg-brand-50 font-bold text-brand-500"
                        : "font-medium text-muted hover:bg-brand-50 hover:text-brand-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
