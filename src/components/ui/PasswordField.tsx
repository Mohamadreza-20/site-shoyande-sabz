"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordField({
  label,
  error,
  toggleAriaLabel = "نمایش رمز عبور",
  ...inputProps
}: {
  label: string;
  error?: string;
  toggleAriaLabel?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="flex w-full flex-col gap-2 text-right">
      <span className="text-sm font-semibold text-admin-ink">{label}</span>
      <span
        className={`flex w-full items-center rounded-xl border px-4 py-3 ${
          error ? "border-admin-danger" : "border-admin-line"
        }`}
      >
        <input
          {...inputProps}
          type={visible ? "text" : "password"}
          className="w-full flex-1 text-right text-sm text-admin-ink placeholder:text-admin-muted focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={toggleAriaLabel}
          className="cursor-pointer shrink-0 text-admin-muted"
        >
          {visible ? (
            <EyeOff className="size-[18px]" strokeWidth={2} />
          ) : (
            <Eye className="size-[18px]" strokeWidth={2} />
          )}
        </button>
      </span>
      {error && <span className="text-xs font-medium text-admin-danger">{error}</span>}
    </label>
  );
}
