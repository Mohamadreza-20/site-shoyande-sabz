"use client";

import { useEffect, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { modalBackdrop, modalPanel } from "@/components/motion/variants";
import { useFocusTrap } from "@/lib/useFocusTrap";

export default function Modal({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const panelRef = useFocusTrap(open);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={modalBackdrop}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            variants={modalPanel}
            className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[24px] border border-admin-line bg-white outline-none"
          >
            <div className="flex items-center justify-between border-b border-admin-line p-5">
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="cursor-pointer flex size-8 items-center justify-center rounded-lg text-admin-muted transition hover:bg-admin-bg"
              >
                <X className="size-4" strokeWidth={2} />
              </button>
              <div className="flex flex-col items-end gap-0.5 text-right">
                <p id={titleId} className="text-base font-bold text-admin-ink">
                  {title}
                </p>
                {description && <p className="text-xs text-admin-muted">{description}</p>}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
