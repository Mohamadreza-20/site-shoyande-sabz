"use client";

type ToggleProps = {
  name: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function Toggle({ name, label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-admin-line p-4">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        aria-label={label}
        className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition ${checked ? "bg-admin-primary" : "bg-admin-line"}`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${checked ? "right-0.5" : "right-[22px]"}`}
        />
      </button>
      <input type="hidden" name={name} value={String(checked)} />
      <div className="flex flex-1 flex-col items-end gap-0.5 text-right">
        <p className="text-sm font-semibold text-admin-ink">{label}</p>
        <p className="text-xs text-admin-muted">{description}</p>
      </div>
    </div>
  );
}
