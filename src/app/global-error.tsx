"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, RotateCcw } from "lucide-react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-brand-50 px-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="size-7 text-red-500" strokeWidth={1.75} />
          </span>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-black text-brand-700">خطای غیرمنتظره</h1>
            <p className="max-w-md text-sm text-muted">
              مشکلی در بارگذاری برنامه پیش آمد. تیم فنی از این خطا مطلع شد؛ لطفاً دوباره تلاش
              کنید.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="cursor-pointer flex items-center gap-2 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            <RotateCcw className="size-4" strokeWidth={2} />
            تلاش دوباره
          </button>
        </div>
      </body>
    </html>
  );
}
