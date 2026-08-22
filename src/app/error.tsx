"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { isNetworkError, isApiError, apiErrorMessage } from "@/lib/http";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("[app] unhandled error", error);
    Sentry.captureException(error);
  }, [error]);

  const isKnownApiFailure = isNetworkError(error) || isApiError(error);
  const description = isKnownApiFailure
    ? apiErrorMessage(error)
    : "مشکلی در نمایش این صفحه پیش آمد. لطفاً دوباره تلاش کنید.";

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-brand-50 px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="size-7 text-red-500" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-black text-brand-700">مشکلی پیش آمد</h1>
        <p className="max-w-md text-sm text-muted">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="cursor-pointer flex items-center gap-2 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
        >
          <RotateCcw className="size-4" strokeWidth={2} />
          تلاش دوباره
        </button>
        <Link
          href="/"
          className="cursor-pointer rounded-full border border-brand-200 px-5 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-brand-100"
        >
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
