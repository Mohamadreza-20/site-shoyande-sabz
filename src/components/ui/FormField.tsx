import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function fieldInputClass(hasError?: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 text-right text-sm text-admin-ink placeholder:text-admin-muted focus:outline-none focus:ring-2 ${
    hasError
      ? "border-admin-danger focus:ring-admin-danger/30"
      : "border-admin-line focus:ring-admin-primary/30"
  }`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-xs font-medium text-admin-danger">{message}</span>;
}

type FieldWrapperProps = {
  label: string;
  error?: string;
  children?: ReactNode;
};

function FieldWrapper({ label, error, children }: FieldWrapperProps) {
  return (
    <label className="flex w-full flex-col gap-1.5 text-right">
      <span className="text-sm font-semibold text-admin-ink">{label}</span>
      {children}
      <FieldError message={error} />
    </label>
  );
}

export function TextField({
  label,
  error,
  className,
  ...inputProps
}: FieldWrapperProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrapper label={label} error={error}>
      <input
        {...inputProps}
        className={className ?? fieldInputClass(Boolean(error))}
      />
    </FieldWrapper>
  );
}

export function TextAreaField({
  label,
  error,
  className,
  ...textareaProps
}: FieldWrapperProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        {...textareaProps}
        className={className ?? fieldInputClass(Boolean(error))}
      />
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  error,
  className,
  children,
  ...selectProps
}: FieldWrapperProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrapper label={label} error={error}>
      <select {...selectProps} className={className ?? fieldInputClass(Boolean(error))}>
        {children}
      </select>
    </FieldWrapper>
  );
}
