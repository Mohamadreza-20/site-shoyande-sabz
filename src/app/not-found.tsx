import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-background px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-100">
        <SearchX className="size-7 text-brand-400" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-display text-2xl font-extrabold text-brand-700">Page not found</h1>
        <p className="max-w-md text-sm text-muted">
          The page you are looking for does not exist or has been removed.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
      >
        Back to home
      </Link>
    </main>
  );
}
