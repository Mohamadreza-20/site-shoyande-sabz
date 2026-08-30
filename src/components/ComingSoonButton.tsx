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
      onClick={() => toast.info("این بخش هنوز راه‌اندازی نشده است.")}
      aria-label={ariaLabel}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
