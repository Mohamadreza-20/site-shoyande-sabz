"use client";

import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { adminInputClass } from "@/components/ui/FormField";
import { apiErrorMessage } from "@/lib/http";
import type { ContactMessage } from "@/features/messages/types";
import { messageStatusStyles } from "@/features/messages/constants";
import { useReplyToMessage } from "@/features/messages/hooks";

type ReplyFormValues = { reply: string };

function formatDate(iso: string) {
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

export default function MessageDetail({ message }: { message: ContactMessage }) {
  const replyToMessage = useReplyToMessage();
  const { register, handleSubmit, reset } = useForm<ReplyFormValues>({
    defaultValues: { reply: "" },
  });

  async function onSubmit(values: ReplyFormValues) {
    const reply = values.reply.trim();
    if (!reply) return;
    try {
      await replyToMessage.mutateAsync({ id: message.id, reply });
      reset({ reply: "" });
    } catch (error) {
      toast.error(apiErrorMessage(error));
    }
  }

  const status = messageStatusStyles[message.status];
  return (
    <div className="flex w-full flex-1 flex-col gap-5 rounded-3xl border border-admin-line bg-white p-6">
      <div className="flex flex-col items-start gap-2 border-b border-admin-line pb-5 text-left">
        <div className="flex w-full items-center justify-between">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.border} ${status.text}`}
          >
            {status.label}
          </span>
          <p className="text-lg font-bold text-admin-ink">{message.subject}</p>
        </div>
        <div className="flex w-full flex-col items-start gap-1 text-xs text-admin-muted">
          <p>
            {message.name} · {message.email}
            {message.phone ? ` · ${message.phone}` : ""}
          </p>
          <p>{formatDate(message.date)}</p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 rounded-2xl bg-admin-bg p-4 text-left">
        <p className="text-sm leading-[1.8] text-admin-ink">{message.message}</p>
      </div>

      {message.reply && (
        <div className="flex flex-col items-start gap-2 rounded-2xl border border-admin-success/30 bg-admin-success-bg p-4 text-left">
          <p className="text-xs font-bold text-admin-success">Store reply</p>
          <p className="text-sm leading-[1.8] text-admin-ink">{message.reply}</p>
          {message.repliedAt && (
            <p className="text-[11px] text-admin-muted">{formatDate(message.repliedAt)}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-3">
        <span className="text-sm font-semibold text-admin-ink">
          {message.status === "answered" ? "Send a new reply" : "Reply to this message"}
        </span>
        <textarea
          {...register("reply", { required: true })}
          rows={4}
          placeholder="Write your reply..."
          aria-label="Reply message"
          className={`${adminInputClass} resize-none`}
        />
        <button
          type="submit"
          disabled={replyToMessage.isPending}
          className="flex items-center gap-2 rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="size-4" strokeWidth={2} />
          {replyToMessage.isPending ? "Sending..." : "Send reply"}
        </button>
      </form>
    </div>
  );
}
