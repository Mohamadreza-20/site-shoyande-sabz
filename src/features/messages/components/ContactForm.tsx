"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/http";
import { useCreateMessage } from "@/features/messages/hooks";
import { useAuth } from "@/features/auth/hooks/useAuth";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const createMessage = useCreateMessage();

  const { register, handleSubmit, reset } = useForm<ContactFormValues>({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      await createMessage.mutateAsync({
        name: values.name.trim(),
        email: values.email.trim(),
        userId: user?.id,
        phone: user?.phone,
        subject: values.subject.trim() || "بدون موضوع",
        message: values.message.trim(),
      });
    } catch (error) {
      toast.error(apiErrorMessage(error));
      return;
    }
    setSubmitted(true);
    reset({ name: values.name, email: values.email, subject: "", message: "" });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5 rounded-[24px] border border-brand-200 bg-white p-6 sm:p-8"
    >
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex w-full flex-col gap-2 text-right">
          <span className="text-sm font-semibold text-ink">نام و نام خانوادگی</span>
          <input
            required
            type="text"
            {...register("name", { required: true })}
            placeholder="نام شما"
            className="w-full rounded-xl border border-brand-200 px-4 py-3 text-right text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-400/30"
          />
        </label>

        <label className="flex w-full flex-col gap-2 text-right">
          <span className="text-sm font-semibold text-ink">ایمیل</span>
          <input
            required
            type="email"
            {...register("email", { required: true })}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-brand-200 px-4 py-3 text-right text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-400/30"
          />
        </label>
      </div>

      <label className="flex w-full flex-col gap-2 text-right">
        <span className="text-sm font-semibold text-ink">موضوع</span>
        <input
          type="text"
          {...register("subject")}
          placeholder="موضوع پیام شما"
          className="w-full rounded-xl border border-brand-200 px-4 py-3 text-right text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-400/30"
        />
      </label>

      <label className="flex w-full flex-col gap-2 text-right">
        <span className="text-sm font-semibold text-ink">پیام شما</span>
        <textarea
          required
          rows={5}
          {...register("message", { required: true })}
          placeholder="پیام خود را اینجا بنویسید..."
          className="w-full resize-none rounded-xl border border-brand-200 px-4 py-3 text-right text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-400/30"
        />
      </label>

      <button
        type="submit"
        disabled={createMessage.isPending}
        className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-brand-400 p-3.5 text-base font-bold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="size-[18px]" strokeWidth={2} />
        {createMessage.isPending ? "در حال ارسال..." : "ارسال پیام"}
      </button>

      {submitted && (
        <p className="rounded-xl bg-brand-100 px-4 py-3 text-center text-sm font-semibold text-brand-500">
          پیام شما با موفقیت ارسال شد. به‌زودی با شما تماس می‌گیریم.
          {user ? " می‌توانید وضعیت پاسخ را در پنل کاربری خود پیگیری کنید." : ""}
        </p>
      )}
    </form>
  );
}
