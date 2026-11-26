"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { useBrowserHydration } from "@/lib/hooks/useBrowserHydration";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginInput } from "../validation";
import { readSafeCallbackUrl } from "../callback-url";
import { TextField } from "@/components/ui/FormField";
import { PasswordField } from "@/components/ui/PasswordField";

const REMEMBER_KEY = "sabzineh_remembered_identifier";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  useBrowserHydration(
    () => window.localStorage.getItem(REMEMBER_KEY),
    (saved) => {
      if (!saved) return;
      setValue("identifier", saved);
      setRememberMe(true);
    }
  );

  async function onSubmit(values: LoginInput) {
    const result = await login(values.identifier, values.password);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    if (rememberMe) {
      window.localStorage.setItem(REMEMBER_KEY, values.identifier);
    } else {
      window.localStorage.removeItem(REMEMBER_KEY);
    }
    reset({ identifier: "", password: "" });
    toast.success(`Welcome back, ${result.user.name}!`);
    const fallback = result.user.role === "customer" ? "/" : "/dashboard";
    router.push(readSafeCallbackUrl() ?? fallback);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-1.5 text-left">
        <h1 className="font-display text-2xl font-extrabold text-brand-700">Welcome back</h1>
        <p className="text-[13px] font-normal text-muted">
          Sign in to your account to shop, track orders or manage the store.
        </p>
      </div>

      <TextField
        label="Email or phone number"
        type="text"
        {...register("identifier")}
        autoComplete="username"
        autoCapitalize="none"
        autoCorrect="off"
        placeholder="Email or phone number"
        error={errors.identifier?.message}
      />

      <PasswordField
        label="Password"
        {...register("password")}
        autoComplete="current-password"
        placeholder="Enter your password"
        error={errors.password?.message}
        toggleAriaLabel="Show password"
      />

      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={() => toast.info("This feature is not available in the demo.")}
          className="bg-transparent py-2.5 text-[13px] font-normal text-brand-400 underline"
        >
          Forgot password?
        </button>
        <label className="flex items-center gap-2 text-[13px] font-normal text-muted">
          Remember me
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="size-4 rounded border border-brand-200 accent-admin-primary"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-700 p-3.5 text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-100 p-3">
        <p className="text-[11px] font-normal text-muted">
          Your information is protected with secure protocols.
        </p>
        <Lock className="size-3.5 text-muted" strokeWidth={2} />
      </div>

      <div className="flex w-full flex-col gap-1.5 rounded-xl border border-dashed border-brand-200 p-3 text-left">
        <p className="text-[11px] font-bold text-muted">Demo accounts for each role:</p>
        <p className="text-[11px] text-muted">Customer: sara@sabzineh.com / customer123</p>
        <p className="text-[11px] text-muted">Store manager: manager@sabzineh.com / manager123</p>
        <p className="text-[11px] text-muted">Support: support@sabzineh.com / support123</p>
      </div>
    </form>
  );
}
