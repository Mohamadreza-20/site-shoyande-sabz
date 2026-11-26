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
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.info("This is a demo, so your email is not saved.");
      setEmail("");
      setSubmitting(false);
    }, 400);
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-start gap-4 text-left">
      <h3 className="font-display text-base font-bold text-accent">Join the green list</h3>
      <p className="text-sm leading-[1.6] text-muted-light">
        Get offers, cleaning tips and early access to new formulas. No spam, ever.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-row-reverse items-center justify-between rounded-full bg-white/10 p-1.5 transition-shadow focus-within:ring-2 focus-within:ring-accent/60"
      >
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-accent px-4 py-2.5 text-[13px] font-extrabold text-brand-700 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "..." : "Join"}
        </button>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Email address"
          autoComplete="email"
          inputMode="email"
          className="w-full bg-transparent px-3 text-left text-sm text-muted-light placeholder:text-muted-light focus:outline-none"
        />
      </form>
    </div>
  );
}
