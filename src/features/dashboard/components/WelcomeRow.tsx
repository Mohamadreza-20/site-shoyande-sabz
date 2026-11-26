import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { auth } from "@/auth";
import { roleLabel } from "@/features/auth/utils";

export default async function WelcomeRow() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex w-full flex-col items-stretch justify-between gap-6 sm:flex-row sm:items-center">
      {user ? (
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-[28px] font-extrabold leading-tight text-admin-ink">
            Welcome back, <span className="marker">{user.name}</span>
          </h1>
          <p className="text-sm text-admin-muted">
            {roleLabel(user.role)} · Your Leafwash store at a glance
          </p>
        </div>
      ) : (
        <span />
      )}
      <Link
        href="/dashboard/reports"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-admin-sidebar px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
      >
        Export report
        <ArrowUpRight className="size-4" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
