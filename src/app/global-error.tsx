"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { logger } from "@/lib/logger";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("[app] global error", error);
  }, [error]);

  return (
    <html lang="en" dir="ltr">
      <body className="antialiased">
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-background px-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="size-7 text-red-500" strokeWidth={1.75} />
          </span>
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-display text-2xl font-extrabold text-brand-700">
              Unexpected error
            </h1>
            <p className="max-w-md text-sm text-muted">The app failed to load. Please try again.</p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center gap-2 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            <RotateCcw className="size-4" strokeWidth={2} />
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
