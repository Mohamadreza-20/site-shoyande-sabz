import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import type { ContactMessage } from "@/features/messages/types";
import { messageStatusStyles } from "@/features/messages/constants";

function formatMessageDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fa-IR", {
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
      <div className="flex items-center justify-between p-6">
        <Link href="/contact" className="cursor-pointer flex items-center gap-1.5 text-sm font-bold text-brand-500">
          <ArrowLeft className="size-4" strokeWidth={2.5} />
          ارسال پیام جدید
        </Link>
        <p className="text-lg font-bold text-brand-700">پیام‌های من</p>
      </div>

      {loading ? (
        <p className="px-6 pb-6 text-sm text-muted">در حال بارگذاری پیام‌ها...</p>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center gap-4 px-6 pb-10 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-brand-100">
            <MessageSquare className="size-6 text-brand-400" strokeWidth={1.75} />
          </span>
          <p className="text-sm text-muted">هنوز پیامی از طریق فرم تماس با ما ارسال نکرده‌اید.</p>
          <Link
            href="/contact"
            className="cursor-pointer flex items-center gap-2 rounded-full bg-brand-400 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            تماس با ما
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-6 pb-6">
          {messages.map((msg) => {
            const status = messageStatusStyles[msg.status];
            return (
              <div
                key={msg.id}
                className="flex flex-col items-end gap-3 rounded-2xl border border-brand-200 p-4 text-right"
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.border} ${status.text}`}
                  >
                    {status.label}
                  </span>
                  <p className="text-sm font-bold text-brand-700">{msg.subject}</p>
                </div>
                <p className="w-full text-sm leading-[1.7] text-ink">{msg.message}</p>
                <p className="w-full text-[11px] text-muted">{formatMessageDate(msg.date)}</p>

                {msg.status === "answered" && msg.reply && (
                  <div className="flex w-full flex-col items-end gap-1.5 rounded-xl bg-brand-50 p-3">
                    <p className="text-xs font-bold text-brand-500">پاسخ فروشگاه</p>
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
