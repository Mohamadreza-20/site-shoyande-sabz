"use client";

import { toast } from "sonner";

export default function ComingSoonButton({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => toast.info("This section is not available yet.")}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
