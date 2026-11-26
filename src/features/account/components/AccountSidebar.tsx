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
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="flex w-full flex-col items-start gap-5 rounded-[32px] border border-brand-200 bg-white p-6 text-left shadow-[0_8px_24px_rgba(15,47,34,0.05)] lg:w-[320px] lg:shrink-0">
      <div className="flex w-full flex-col items-start gap-3">
        <div className="relative">
          <span aria-hidden className="absolute -bottom-1 -left-1 size-7 rounded-full bg-accent" />
          <span className="relative flex size-[72px] items-center justify-center rounded-full bg-brand-700 font-display text-3xl font-extrabold text-white">
            {initial}
          </span>
        </div>
        <div className="flex w-full flex-col items-start gap-1.5">
          <p className="font-display text-xl font-extrabold text-brand-700">{name}</p>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-brand-600">
            {roleLabel}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2.5 border-t border-brand-200 pt-4">
        <div className="flex min-w-0 items-center gap-2 text-sm text-muted">
          <Mail className="size-4 shrink-0" strokeWidth={2} />
          <span className="min-w-0 truncate">{email}</span>
        </div>
        {phone && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Phone className="size-4 shrink-0" strokeWidth={2} />
            <span>{phone}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onEditProfile}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white p-3 text-sm font-bold text-brand-700 transition hover:bg-accent-soft"
      >
        <Pencil className="size-4" strokeWidth={2} />
        Edit profile
      </button>

      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-700 p-3 text-sm font-bold text-white transition hover:bg-brand-600"
      >
        <LogOut className="size-4" strokeWidth={2} />
        Sign out
      </button>
    </div>
  );
}
