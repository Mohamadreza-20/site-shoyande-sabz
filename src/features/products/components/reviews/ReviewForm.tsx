"use client";

import type { FormEvent } from "react";
import { Loader2, Star } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ReviewFormValues } from "@/features/products/hooks/useProductReviewsController";

export default function ReviewForm({
  register,
  errors,
  ratingValue,
  hoverRating,
  onHover,
  onLeave,
  onRate,
  pending,
  onSubmit,
}: {
  register: UseFormRegister<ReviewFormValues>;
  errors: FieldErrors<ReviewFormValues>;
  ratingValue: number;
  hoverRating: number;
  onHover: (value: number) => void;
  onLeave: () => void;
  onRate: (value: number) => void;
  pending: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Write a review"
      className="flex w-full flex-col gap-4 rounded-[28px] border border-brand-200 bg-white p-4 text-left sm:p-6"
    >
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-ink">Your name</span>
          <input
            type="text"
            {...register("name", {
              required: "Please enter your name.",
              validate: (value) => value.trim().length > 0 || "Please enter your name.",
              maxLength: { value: 60, message: "Name is too long (60 characters max)." },
            })}
            autoFocus
            autoComplete="name"
            placeholder="Full name"
            aria-invalid={Boolean(errors.name)}
            className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-400/30 ${
              errors.name ? "border-red-400" : "border-brand-200"
            }`}
          />
          {errors.name && (
            <span role="alert" className="text-xs font-medium text-red-600">
              {errors.name.message}
            </span>
          )}
        </label>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-ink">Your rating</span>
          <div role="radiogroup" aria-label="Your rating" className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => {
              const starValue = index + 1;
              const filled = starValue <= (hoverRating || ratingValue);
              return (
                <button
                  className="flex size-10 items-center justify-center rounded-lg"
                  key={starValue}
                  type="button"
                  role="radio"
                  aria-checked={starValue === ratingValue}
                  aria-label={`Rate ${starValue} out of 5`}
                  onMouseEnter={() => onHover(starValue)}
                  onMouseLeave={onLeave}
                  onClick={() => onRate(starValue)}
                >
                  <Star
                    className={filled ? "size-6 fill-accent text-accent" : "size-6 text-brand-200"}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <label className="flex w-full flex-col gap-2">
        <span className="text-sm font-semibold text-ink">Your review</span>
        <textarea
          {...register("comment", {
            required: "Please write your review.",
            validate: (value) => value.trim().length >= 3 || "Your review is too short.",
            maxLength: { value: 1000, message: "Review is too long (1000 characters max)." },
          })}
          rows={4}
          placeholder="Tell us how this product worked for you..."
          aria-invalid={Boolean(errors.comment)}
          className={`w-full resize-none rounded-xl border px-4 py-3 text-left text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-400/30 ${
            errors.comment ? "border-red-400" : "border-brand-200"
          }`}
        />
        {errors.comment && (
          <span role="alert" className="text-xs font-medium text-red-600">
            {errors.comment.message}
          </span>
        )}
      </label>
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-700 px-6 py-3 sm:w-fit sm:self-start text-sm font-bold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending && <Loader2 className="size-4 animate-spin" strokeWidth={2} />}
        {pending ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}
