"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { signupSchema, type SignupInput } from "../validation";
import { readSafeCallbackUrl } from "../callback-url";
import { TextField } from "@/components/ui/FormField";
import { PasswordField } from "@/components/ui/PasswordField";

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: SignupInput) {
    const result = await signup(values);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    reset({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
    toast.success(`Welcome to Leafwash, ${result.user.name}!`);
    router.push(readSafeCallbackUrl() ?? "/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-3.5">
      <div className="flex w-full flex-col gap-1.5 text-left">
        <h1 className="font-display text-2xl font-extrabold text-brand-700">Create your account</h1>
        <p className="text-[13px] font-normal text-muted">
          Join the green-living community and unlock member-only offers.
        </p>
      </div>

      <TextField
        label="Full name"
        type="text"
        {...register("name")}
        autoComplete="name"
        placeholder="e.g. Jane Rivera"
        error={errors.name?.message}
      />

      <TextField
        label="Email address"
        type="email"
        {...register("email")}
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
        error={errors.email?.message}
      />

      <TextField
        label="Phone number"
        type="tel"
        {...register("phone")}
        autoComplete="tel"
        inputMode="tel"
        placeholder="+1 555 123 4567"
        error={errors.phone?.message}
      />

      <PasswordField
        label="Password"
        {...register("password")}
        autoComplete="new-password"
        placeholder="At least 6 characters"
        error={errors.password?.message}
        toggleAriaLabel="Show password"
      />

      <PasswordField
        label="Confirm password"
        {...register("confirmPassword")}
        autoComplete="new-password"
        placeholder="Repeat your password"
        error={errors.confirmPassword?.message}
        toggleAriaLabel="Show password confirmation"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-700 p-3.5 text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
