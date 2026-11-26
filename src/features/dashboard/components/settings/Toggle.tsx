"use client";

import { cn } from "@/lib/cn";
type ToggleProps = {
  name: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function Toggle({ name, label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-admin-line p-4">
      <div className="flex flex-1 flex-col gap-0.5 text-left">
        <p className="text-sm font-semibold text-admin-ink">{label}</p>
        <p className="text-xs text-admin-muted">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        aria-label={label}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-admin-primary" : "bg-admin-line"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white transition-all",
            checked ? "left-[22px]" : "left-0.5"
          )}
        />
      </button>
      <input type="hidden" name={name} value={String(checked)} />
    </div>
  );
}
