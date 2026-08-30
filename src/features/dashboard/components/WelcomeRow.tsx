import Link from "next/link";
import { auth } from "@/auth";
import { roleLabel } from "@/features/auth/utils";

export default async function WelcomeRow() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex w-full flex-col-reverse items-stretch justify-between gap-6 sm:flex-row sm:items-center">
      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/reports"
          className="rounded-[10px] border border-admin-line bg-white px-5 py-2.5 text-sm font-semibold text-admin-primary transition hover:bg-admin-bg"
        >
          تهیه گزارش خروجی
        </Link>
      </div>
      {user ? (
        <div className="flex flex-col items-end gap-1 text-right">
          <p className="text-[22px] font-bold text-admin-ink">سلام {user.name}، وقت بخیر</p>
          <p className="text-sm text-admin-muted">
            {roleLabel(user.role)} · خلاصه وضعیت فروشگاه شوینده ارگانیک شست‌وشو سبز در یک نگاه
          </p>
        </div>
      ) : null}
    </div>
  );
}
