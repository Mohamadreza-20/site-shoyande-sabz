import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const inputBase =
  "w-full rounded-xl border text-left placeholder:text-admin-muted focus:outline-none focus:ring-2 transition-shadow";

export function fieldInputClass(hasError?: boolean) {
  const tone = hasError
    ? "border-admin-danger focus:ring-admin-danger/30"
    : "border-admin-line focus:ring-admin-primary/30";
  return `${inputBase} px-4 py-2.5 text-base text-admin-ink sm:text-sm ${tone}`;
}

export const adminInputClass = `${inputBase} border-admin-line bg-white px-4 py-3 text-sm text-admin-ink focus:ring-admin-primary/30`;

export const storeInputClass =
  "w-full rounded-xl border border-brand-200 px-4 py-3 text-left text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-400/30";

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span role="alert" className="text-xs font-medium text-admin-danger">
      {message}
    </span>
  );
}

type FieldWrapperProps = {
  label: string;
  error?: string;
  children?: ReactNode;
};

function FieldWrapper({ label, error, children }: FieldWrapperProps) {
  return (
    <label className="flex w-full flex-col gap-1.5 text-left">
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
        aria-invalid={Boolean(error)}
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
      <textarea {...textareaProps} className={className ?? fieldInputClass(Boolean(error))} />
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
