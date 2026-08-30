export function ModalFormActions({
  onCancel,
  saving,
  savingLabel,
  submitLabel,
}: {
  onCancel: () => void;
  saving: boolean;
  savingLabel: string;
  submitLabel: string;
}) {
  return (
    <div className="flex items-center justify-end gap-3 pt-1">
      <button
        type="button"
        onClick={onCancel}
        className="cursor-pointer rounded-xl border border-admin-line px-5 py-2.5 text-sm font-semibold text-admin-ink transition hover:bg-admin-bg"
      >
        انصراف
      </button>
      <button
        type="submit"
        disabled={saving}
        className="cursor-pointer rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? savingLabel : submitLabel}
      </button>
    </div>
  );
}
