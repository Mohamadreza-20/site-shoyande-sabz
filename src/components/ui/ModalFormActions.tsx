import { cn } from "@/lib/cn";

export function ModalFormActions({
  onCancel,
  onConfirm,
  saving,
  savingLabel,
  submitLabel,
  cancelLabel = "Cancel",
  tone = "primary",
  sticky = true,
}: {
  onCancel: () => void;
  onConfirm?: () => void;
  saving: boolean;
  savingLabel: string;
  submitLabel: string;
  cancelLabel?: string;
  tone?: "primary" | "danger";
  sticky?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 pt-1",
        sticky &&
          "sticky -bottom-4 -mx-4 -mb-4 border-t border-admin-line bg-white px-4 py-3 sm:-bottom-5 sm:-mx-5 sm:-mb-5 sm:px-5 sm:py-4"
      )}
    >
      <button
        type="button"
        onClick={onCancel}
        disabled={saving}
        className="min-w-0 flex-1 rounded-xl border border-admin-line px-5 py-3 text-sm font-semibold text-admin-ink transition hover:bg-admin-bg disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:py-2.5"
      >
        {cancelLabel}
      </button>
      <button
        type={onConfirm ? "button" : "submit"}
        onClick={onConfirm}
        disabled={saving}
        className={cn(
          "min-w-0 flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:py-2.5",
          tone === "danger" ? "bg-admin-danger" : "bg-admin-primary"
        )}
      >
        {saving ? savingLabel : submitLabel}
      </button>
    </div>
  );
}
