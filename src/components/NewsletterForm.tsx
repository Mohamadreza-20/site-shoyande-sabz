"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValidEmail) {
      toast.error("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.info("این بخش در نسخه نمایشی فعال نیست و ایمیل شما ذخیره نمی‌شود.");
      setEmail("");
      setSubmitting(false);
    }, 400);
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-end gap-4 text-right">
      <h3 className="text-lg font-bold text-white">عضویت در خبرنامه سبز</h3>
      <p className="text-sm leading-[1.6] text-muted-light">
        با عضویت در خبرنامه ما از آخرین تخفیف‌ها، مقالات آموزشی و جوایز دوره‌ای بهره‌مند شوید.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center justify-between rounded-full bg-white/10 p-1.5"
      >
        <button
          type="submit"
          disabled={submitting}
          className="cursor-pointer rounded-full bg-brand-400 px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "..." : "تایید"}
        </button>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل شما..."
          dir="rtl"
          className="w-full bg-transparent px-3 text-right text-sm text-muted-light placeholder:text-muted-light focus:outline-none"
        />
      </form>
    </div>
  );
}
