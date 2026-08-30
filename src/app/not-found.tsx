import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-brand-50 px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-100">
        <SearchX className="size-7 text-brand-500" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-black text-brand-700">صفحه یا محصول موردنظر پیدا نشد</h1>
        <p className="max-w-md text-sm text-muted">
          آدرس واردشده وجود ندارد یا حذف شده است.
        </p>
      </div>
      <Link
        href="/"
        className="cursor-pointer rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
      >
        بازگشت به خانه
      </Link>
    </div>
  );
}
