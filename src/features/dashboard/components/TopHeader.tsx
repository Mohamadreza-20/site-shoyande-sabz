import Link from "next/link";
import { Bell, Home } from "lucide-react";
import { auth } from "@/auth";
import { roleLabel } from "@/features/auth/utils";

export default async function TopHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex h-auto w-full flex-col-reverse items-stretch justify-between gap-4 sm:h-[70px] sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-admin-primary text-sm font-bold text-white">
              {user.name.trim().charAt(0) || "؟"}
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <p className="text-sm font-bold text-admin-ink">{user.name}</p>
              <p className="text-xs text-admin-muted">{roleLabel(user.role)}</p>
            </div>
          </div>
        ) : null}
        <span className="hidden h-6 w-px bg-admin-line sm:block" />
        <Link
          href="/dashboard/messages"
          aria-label="مشاهده پیام‌ها و اعلان‌ها"
          className="flex items-center rounded-xl border border-admin-line bg-white p-2 transition hover:bg-admin-bg"
        >
          <Bell className="size-5 text-admin-ink" strokeWidth={2} />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-admin-line bg-white px-3 py-2 text-xs font-bold text-admin-ink transition hover:bg-admin-bg"
        >
          <Home className="size-4" strokeWidth={2} />
          <span className="hidden sm:inline">بازگشت به خانه</span>
        </Link>
      </div>
    </div>
  );
}
