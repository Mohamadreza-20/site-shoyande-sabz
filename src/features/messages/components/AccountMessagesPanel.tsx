import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import type { ContactMessage } from "@/features/messages/types";
import { messageStatusStyles } from "@/features/messages/constants";

function formatMessageDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function AccountMessagesPanel({
  messages,
  loading,
}: {
  messages: ContactMessage[];
  loading: boolean;
}) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-brand-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 p-4 sm:p-6">
        <h2 className="font-display text-xl font-extrabold text-brand-700">My messages</h2>
        <Link
          href="/contact"
          className="flex min-h-10 items-center gap-1.5 whitespace-nowrap text-sm font-bold text-brand-500 transition hover:text-brand-700"
        >
          Send a new message
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </Link>
      </div>

      {loading ? (
        <p className="px-6 pb-6 text-sm text-muted">Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center gap-4 px-6 pb-10 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-brand-100">
            <MessageSquare className="size-6 text-brand-400" strokeWidth={1.75} />
          </span>
          <p className="text-sm text-muted">You haven&apos;t sent any messages yet.</p>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            Contact us
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-6 pb-6">
          {messages.map((msg) => {
            const status = messageStatusStyles[msg.status];
            return (
              <div
                key={msg.id}
                className="flex flex-col items-start gap-3 rounded-2xl border border-brand-200 p-4 text-left"
              >
                <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.border} ${status.text}`}
                  >
                    {status.label}
                  </span>
                  <p className="min-w-0 break-words text-sm font-bold text-brand-700">
                    {msg.subject}
                  </p>
                </div>
                <p className="w-full text-sm leading-[1.7] text-ink">{msg.message}</p>
                <p className="w-full text-[11px] text-muted">{formatMessageDate(msg.date)}</p>

                {msg.status === "answered" && msg.reply && (
                  <div className="flex w-full flex-col items-start gap-1.5 rounded-xl bg-brand-50 p-3">
                    <p className="text-xs font-bold text-brand-500">Store reply</p>
                    <p className="w-full text-sm leading-[1.7] text-ink">{msg.reply}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
