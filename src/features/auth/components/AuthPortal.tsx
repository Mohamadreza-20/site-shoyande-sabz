"use client";

import { useState } from "react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { ArrowLeft, Flower2, Heart, Leaf, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { images } from "@/lib/assets";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

type AuthTab = "login" | "signup";

const perks = [
  { icon: ShieldCheck, text: "100% plant-based & biodegradable" },
  { icon: Heart, text: "Cruelty-free, never tested on animals" },
  { icon: Flower2, text: "Scents from pure botanical essences" },
] as const;

export default function AuthPortal() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const isLogin = activeTab === "login";

  return (
    <main className="flex h-dvh w-full items-stretch overflow-hidden bg-background">
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 [scrollbar-width:none] sm:p-8 lg:gap-6 lg:px-16 lg:py-8 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="flex min-h-6 items-center gap-1.5 py-0.5 text-sm font-bold text-brand-700 group/link transition-colors"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-200 group-hover/link:-translate-x-1"
              strokeWidth={2.5}
            />
            Back to store
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center rounded-xl bg-brand-700 p-1.5">
              <Leaf className="size-4 text-accent" strokeWidth={2} />
            </span>
            <span className="font-display text-xl font-extrabold text-brand-700">Leafwash</span>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Account access"
          className="mx-auto shrink-0 flex w-full max-w-[440px] items-center gap-1 rounded-full border border-brand-200 bg-white p-1"
        >
          {(["login", "signup"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`auth-tab-${tab}`}
              aria-selected={activeTab === tab}
              aria-controls="auth-panel"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 rounded-full py-2.5 text-sm font-bold transition",
                activeTab === tab ? "bg-brand-700 text-white" : "text-muted hover:text-brand-700"
              )}
            >
              {tab === "login" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <div
          id="auth-panel"
          role="tabpanel"
          aria-labelledby={`auth-tab-${activeTab}`}
          className="mx-auto flex w-full max-w-[440px] flex-col my-auto gap-5 rounded-[32px] border border-brand-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,47,34,0.08)] sm:p-7"
        >
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>

      <div className="relative hidden w-[520px] shrink-0 flex-col justify-between overflow-hidden bg-brand-700 p-12 lg:flex">
        <SmartImage src={images.authBotanical} alt="" fill sizes="520px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-700 via-brand-700/50 to-brand-700/20" />

        <div className="relative flex w-full flex-col gap-4">
          <p className="font-display text-[34px] font-extrabold leading-[1.2] text-white">
            A cleaner home, <span className="marker !text-brand-700">kinder to the earth.</span>
          </p>
        </div>

        <ul className="relative flex w-full flex-col gap-3">
          {perks.map(({ icon: Icon, text }) => (
            <li key={text} className="flex w-full items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-accent">
                <Icon className="size-4 text-brand-700" strokeWidth={2.25} />
              </span>
              <p className="text-sm font-semibold text-white">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
