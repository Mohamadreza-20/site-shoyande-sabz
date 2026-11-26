"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { modalBackdrop, modalPanel } from "@/components/motion/variants";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useOverlay } from "@/lib/hooks/useOverlay";

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

  useOverlay(open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={modalBackdrop}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            variants={modalPanel}
            className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-[28px] border border-admin-line bg-white shadow-2xl outline-none max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-b-0 max-sm:pb-[env(safe-area-inset-bottom)]"
          >
            <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-admin-line sm:hidden" />
            <div className="flex items-start justify-between gap-3 border-b border-admin-line px-4 py-4 sm:p-5">
              <div className="flex flex-col items-start gap-0.5 text-left">
                <p
                  id={titleId}
                  className="font-display text-base font-bold leading-snug text-admin-ink"
                >
                  {title}
                </p>
                {description && <p className="text-xs text-admin-muted">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 -mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg text-admin-muted transition hover:bg-admin-bg"
              >
                <X className="size-4" strokeWidth={2} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
