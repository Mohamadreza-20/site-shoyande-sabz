"use client";

import { ChevronDown, Plus } from "lucide-react";
import { useId, useState } from "react";
import Collapse from "@/components/ui/Collapse";
import { cn } from "@/lib/cn";
import { faqs as defaultFaqs } from "@/lib/site-content";

export type FaqVariant = "home" | "contact" | "product";
export type FaqItem = { readonly q: string; readonly a: string };

type ListProps = {
  variant: FaqVariant;
  open: number | null;
  setOpen?: (index: number | null) => void;
  className?: string;
  ghost?: boolean;
  items: readonly FaqItem[];
  idPrefix: string;
};

const listClass: Record<FaqVariant, string> = {
  home: "flex flex-col gap-3",
  contact: "flex flex-col divide-y divide-brand-200 border-y border-brand-200",
  product: "flex flex-col gap-3",
};

const itemClass: Record<FaqVariant, string> = {
  home: "overflow-hidden rounded-3xl border border-brand-200 bg-white",
  contact: "",
  product: "rounded-2xl border border-brand-200 bg-white transition-shadow duration-300",
};

const buttonClass: Record<FaqVariant, string> = {
  home: "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
  contact: "flex w-full items-center justify-between gap-4 py-5 text-left",
  product: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
};

const questionClass: Record<FaqVariant, string> = {
  home: "font-display text-[17px] font-bold text-brand-700",
  contact: "font-display text-lg font-extrabold text-brand-700",
  product: "text-[15px] font-bold text-ink",
};

const answerClass: Record<FaqVariant, string> = {
  home: "px-6 pb-6 text-[15px] leading-[1.75] text-muted",
  contact: "max-w-[680px] pb-5 text-[15px] leading-[1.8] text-muted",
  product: "px-5 pb-4 text-left text-sm leading-[1.8] text-muted",
};

function FaqList({ variant, open, setOpen, className, ghost, items, idPrefix }: ListProps) {
  return (
    <div
      className={cn("col-start-1 row-start-1", listClass[variant], className)}
      {...(ghost ? { "aria-hidden": true, inert: true } : {})}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              itemClass[variant],
              variant === "product" && isOpen && "shadow-[0_8px_24px_rgba(15,47,34,0.06)]"
            )}
          >
            <button
              type="button"
              id={`${idPrefix}-q${i}`}
              aria-expanded={isOpen}
              aria-controls={`${idPrefix}-a${i}`}
              tabIndex={ghost ? -1 : undefined}
              onClick={() => setOpen?.(isOpen ? null : i)}
              className={buttonClass[variant]}
            >
              <span className={questionClass[variant]}>{item.q}</span>
              {variant === "product" ? (
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-brand-400 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                  strokeWidth={2}
                />
              ) : (
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full bg-accent transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                >
                  <Plus className="size-4 text-brand-700" strokeWidth={3} />
                </span>
              )}
            </button>
            <Collapse
              open={isOpen}
              id={`${idPrefix}-a${i}`}
              role="region"
              labelledBy={`${idPrefix}-q${i}`}
            >
              <p className={answerClass[variant]}>{item.a}</p>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
}

export default function FaqAccordion({
  variant,
  items = defaultFaqs,
  initialOpen = null,
  className,
}: {
  variant: FaqVariant;
  items?: readonly FaqItem[];
  initialOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(initialOpen);
  const idPrefix = useId();

  return (
    <div className={cn("grid w-full", className)}>
      <FaqList variant={variant} items={items} idPrefix={idPrefix} open={open} setOpen={setOpen} />
      {items.map((item, i) => (
        <FaqList
          key={item.q}
          variant={variant}
          items={items}
          idPrefix={`${idPrefix}-ghost${i}`}
          open={i}
          ghost
          className="pointer-events-none invisible [&_*]:!invisible"
        />
      ))}
    </div>
  );
}
