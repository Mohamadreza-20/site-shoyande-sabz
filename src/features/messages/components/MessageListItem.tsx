import { memo } from "react";
import { User } from "lucide-react";
import type { ContactMessage } from "@/features/messages/types";
import { messageStatusStyles } from "@/features/messages/constants";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

export const MessageListItem = memo(function MessageListItem({
  message,
  isSelected,
  onSelect,
}: {
  message: ContactMessage;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const status = messageStatusStyles[message.status];
  return (
    <button
      type="button"
      onClick={() => onSelect(message.id)}
      className={`cursor-pointer flex flex-col items-end gap-2 rounded-2xl border p-4 text-right transition ${
        isSelected ? "border-admin-primary bg-admin-success-bg/40" : "border-transparent hover:bg-admin-bg"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${status.bg} ${status.border} ${status.text}`}>
          {status.label}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-bold text-admin-ink">
          {message.name}
          <User className="size-3.5 text-admin-muted" strokeWidth={2} />
        </span>
      </div>
      <p className="line-clamp-1 w-full text-sm font-semibold text-admin-ink">{message.subject}</p>
      <p className="line-clamp-2 w-full text-xs text-admin-muted">{message.message}</p>
      <p className="w-full text-[11px] text-admin-muted">{formatDate(message.date)}</p>
    </button>
  );
});
