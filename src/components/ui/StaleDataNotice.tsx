"use client";

import { cn } from "@/lib/cn";
import { AlertTriangle } from "lucide-react";

export function StaleDataNotice({
  message = "We couldn't load fresh data. What you see may be out of date.",
  onRetry,
  variant = "admin",
}: {
  message?: string;
  onRetry?: () => void;
  variant?: "admin" | "storefront";
}) {
  const styles =
    variant === "admin"
      ? {
          wrap: "border-admin-danger/30 bg-admin-danger-bg/50 text-admin-danger",
          retry: "border-admin-danger/30 bg-white text-admin-danger hover:bg-admin-danger-bg",
        }
      : {
          wrap: "border-red-200 bg-red-50 text-red-600",
          retry: "border-red-200 bg-white text-red-600 hover:bg-red-100",
        };

  return (
    <div
      role="alert"
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-xs font-semibold",
        styles.wrap
      )}
    >
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            "shrink-0 rounded-lg border px-3 py-1.5 text-[11px] font-bold transition",
            styles.retry
          )}
        >
          Try again
        </button>
      )}
      <span className="flex min-w-0 flex-1 items-center gap-2">
        {message}
        <AlertTriangle className="size-4 shrink-0" strokeWidth={2} />
      </span>
    </div>
  );
}
