"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { drawerBackdrop, drawerPanel } from "@/components/motion/variants";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useOverlay } from "@/lib/hooks/useOverlay";

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

  useOverlay(open, onClose);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={drawerBackdrop}
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            tabIndex={-1}
            variants={drawerPanel("left")}
            className="absolute inset-y-0 left-0 flex w-[80%] max-w-[320px] flex-col gap-2 bg-[#f7f3e8] p-6 shadow-xl outline-none"
          >
            <div className="mb-4 flex flex-row-reverse items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-9 items-center justify-center rounded-full bg-white text-brand-700 transition hover:bg-accent-soft"
              >
                <X className="size-5" strokeWidth={2} />
              </button>
              <span className="font-display text-lg font-extrabold text-brand-700">Menu</span>
            </div>

            <nav className="flex flex-col items-start gap-1 text-left">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-full rounded-full px-4 py-3 text-[15px] transition ${
                      isActive
                        ? "bg-accent font-bold text-brand-700"
                        : "font-medium text-muted hover:bg-brand-100 hover:text-brand-700"
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
    </AnimatePresence>,
    document.body
  );
}
