"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { storeInputClass } from "@/components/ui/FormField";
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
        subject: values.subject.trim() || "No subject",
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
        <label className="flex w-full flex-col gap-2 text-left">
          <span className="text-sm font-semibold text-ink">Full name</span>
          <input
            required
            type="text"
            {...register("name", { required: true })}
            autoComplete="name"
            placeholder="Your name"
            className={storeInputClass}
          />
        </label>

        <label className="flex w-full flex-col gap-2 text-left">
          <span className="text-sm font-semibold text-ink">Email</span>
          <input
            required
            type="email"
            {...register("email", { required: true })}
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            className={storeInputClass}
          />
        </label>
      </div>

      <label className="flex w-full flex-col gap-2 text-left">
        <span className="text-sm font-semibold text-ink">Subject</span>
        <input
          type="text"
          {...register("subject")}
          autoComplete="off"
          placeholder="Message subject"
          className={storeInputClass}
        />
      </label>

      <label className="flex w-full flex-col gap-2 text-left">
        <span className="text-sm font-semibold text-ink">Your message</span>
        <textarea
          required
          rows={5}
          {...register("message", { required: true })}
          placeholder="Write your message here..."
          className={`${storeInputClass} resize-none`}
        />
      </label>

      <button
        type="submit"
        disabled={createMessage.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-400 p-3.5 text-base font-bold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="size-[18px]" strokeWidth={2} />
        {createMessage.isPending ? "Sending..." : "Send message"}
      </button>

      {submitted && (
        <p className="rounded-xl bg-brand-100 px-4 py-3 text-center text-sm font-semibold text-brand-500">
          Your message was sent. We&apos;ll get back to you soon.
          {user ? " You can follow the reply in your account." : ""}
        </p>
      )}
    </form>
  );
}
