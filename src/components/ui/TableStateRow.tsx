import { AlertTriangle, Inbox } from "lucide-react";

export function TableStateRow({
  colSpan,
  isError,
  errorMessage,
  emptyMessage,
  onRetry,
}: {
  colSpan: number;
  isError: boolean;
  errorMessage: string;
  emptyMessage: string;
  onRetry?: () => void;
}) {
  if (isError) {
    return (
      <tr>
        <td colSpan={colSpan} className="px-6 py-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <AlertTriangle className="size-6 text-admin-danger" strokeWidth={2} />
            <p className="text-sm font-semibold text-admin-danger">{errorMessage}</p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="cursor-pointer mt-1 rounded-lg border border-admin-line px-3 py-1.5 text-xs font-semibold text-admin-ink transition hover:bg-admin-bg"
              >
                تلاش دوباره
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-10">
        <div className="flex flex-col items-center gap-2 text-center text-admin-muted">
          <Inbox className="size-6" strokeWidth={2} />
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </td>
    </tr>
  );
}

export function GridStateBlock({
  isError,
  errorMessage,
  emptyMessage,
  onRetry,
}: {
  isError: boolean;
  errorMessage: string;
  emptyMessage: string;
  onRetry?: () => void;
}) {
  if (isError) {
    return (
      <div className="col-span-full flex flex-col items-center gap-2 rounded-[20px] border border-dashed border-admin-danger/40 bg-admin-danger-bg/40 py-12 text-center">
        <AlertTriangle className="size-6 text-admin-danger" strokeWidth={2} />
        <p className="text-sm font-semibold text-admin-danger">{errorMessage}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="cursor-pointer mt-1 rounded-lg border border-admin-line bg-white px-3 py-1.5 text-xs font-semibold text-admin-ink transition hover:bg-admin-bg"
          >
            تلاش دوباره
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="col-span-full flex flex-col items-center gap-2 rounded-[20px] border border-dashed border-admin-line py-12 text-center text-admin-muted">
      <Inbox className="size-6" strokeWidth={2} />
      <p className="text-sm">{emptyMessage}</p>
    </div>
  );
}
