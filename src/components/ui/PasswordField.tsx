"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldError, fieldInputClass } from "@/components/ui/FormField";

export function PasswordField({
  label,
  error,
  toggleAriaLabel = "Show password",
  ...inputProps
}: {
  label: string;
  error?: string;
  toggleAriaLabel?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="flex w-full flex-col gap-1.5 text-left">
      <span className="text-sm font-semibold text-admin-ink">{label}</span>
      <span className="relative flex w-full">
        <input
          aria-invalid={Boolean(error)}
          {...inputProps}
          type={visible ? "text" : "password"}
          className={`${fieldInputClass(Boolean(error))} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? toggleAriaLabel.replace("Show", "Hide") : toggleAriaLabel}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-admin-muted transition-colors hover:text-admin-ink"
        >
          {visible ? (
            <EyeOff className="size-[18px]" strokeWidth={2} />
          ) : (
            <Eye className="size-[18px]" strokeWidth={2} />
          )}
        </button>
      </span>
      <FieldError message={error} />
    </label>
  );
}
