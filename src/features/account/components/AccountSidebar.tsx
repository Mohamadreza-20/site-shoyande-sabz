import { LogOut, Mail, Pencil, Phone } from "lucide-react";

export default function AccountSidebar({
  name,
  roleLabel,
  email,
  phone,
  onLogout,
  onEditProfile,
}: {
  name: string;
  roleLabel: string;
  email: string;
  phone?: string;
  onLogout: () => void;
  onEditProfile: () => void;
}) {
  const initial = name.trim().charAt(0) || "؟";

  return (
    <div className="flex w-full flex-col items-end gap-5 rounded-3xl border border-brand-200 bg-white p-6 text-right lg:w-[320px] lg:shrink-0">
      <div className="flex w-full flex-col items-end gap-3">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand-300 text-2xl font-black text-brand-700">
          {initial}
        </span>
        <div className="flex w-full flex-col items-end gap-1">
          <p className="text-lg font-black text-brand-700">{name}</p>
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-500">
            {roleLabel}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 border-t border-brand-200 pt-4">
        <div className="flex min-w-0 items-center justify-end gap-2 text-sm text-muted">
          <span className="min-w-0 truncate" dir="ltr">{email}</span>
          <Mail className="size-4 shrink-0" strokeWidth={2} />
        </div>
        {phone && (
          <div className="flex items-center justify-end gap-2 text-sm text-muted">
            <span dir="ltr">{phone}</span>
            <Phone className="size-4 shrink-0" strokeWidth={2} />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onEditProfile}
        className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white p-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
      >
        <Pencil className="size-4" strokeWidth={2} />
        ویرایش اطلاعات حساب
      </button>

      <button
        type="button"
        onClick={onLogout}
        className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white p-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
      >
        <LogOut className="size-4" strokeWidth={2} />
        خروج از حساب کاربری
      </button>
    </div>
  );
}
