import Link from "next/link";
import { Bell, Home } from "lucide-react";
import { auth } from "@/auth";
import { roleLabel } from "@/features/auth/utils";

export default async function TopHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex h-auto w-full items-center justify-between gap-4 sm:h-[70px]">
      {user ? (
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-admin-accent font-display text-base font-extrabold text-brand-700">
            {(user.name ?? "").trim().charAt(0).toUpperCase() || "?"}
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <p className="text-sm font-bold text-admin-ink">{user.name}</p>
            <p className="text-xs text-admin-muted">{roleLabel(user.role)}</p>
          </div>
        </div>
      ) : (
        <span />
      )}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/messages"
          aria-label="View messages and notifications"
          className="flex items-center rounded-full border border-admin-line bg-white p-2.5 transition hover:bg-admin-accent/20"
        >
          <Bell className="size-5 text-admin-ink" strokeWidth={2} />
        </Link>
        <Link
          href="/"
          aria-label="Back to store"
          className="flex items-center gap-2 rounded-full border border-admin-line bg-white px-4 py-2.5 text-xs font-bold text-admin-ink transition hover:bg-admin-accent/20"
        >
          <Home className="size-4" strokeWidth={2} />
          <span className="hidden sm:inline">Back to store</span>
        </Link>
      </div>
    </div>
  );
}
