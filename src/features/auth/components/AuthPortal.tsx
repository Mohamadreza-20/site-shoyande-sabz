"use client";

import { useState } from "react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { ArrowLeft, Flower2, Heart, Leaf, ShieldCheck } from "lucide-react";
import { images } from "@/lib/assets";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

type AuthTab = "login" | "signup";

export default function AuthPortal() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const isLogin = activeTab === "login";

  return (
    <div className="flex min-h-screen w-full items-stretch bg-admin-bg">

      <div className="flex flex-1 flex-col gap-8 p-6 sm:p-10 lg:p-16">

        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1.5 text-sm font-semibold text-admin-primary"
          >
            <ArrowLeft className="size-4" strokeWidth={2.5} />
            بازگشت به فروشگاه
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-black text-admin-sidebar">سبزینه پاک</span>
            <span className="flex items-center justify-center rounded-[10px] bg-admin-sidebar p-1.5">
              <Leaf className="size-4 text-white" strokeWidth={2} />
            </span>
          </div>
        </div>


        <div className="mx-auto flex w-full max-w-[420px] items-center gap-1 rounded-[14px] border border-admin-line bg-white p-1">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`cursor-pointer flex-1 rounded-xl py-2.5 text-sm font-bold transition ${
              isLogin
                ? "bg-admin-sidebar text-white"
                : "text-admin-muted hover:text-admin-ink"
            }`}
          >
            ورود
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            className={`cursor-pointer flex-1 rounded-xl py-2.5 text-sm font-bold transition ${
              !isLogin
                ? "bg-admin-sidebar text-white"
                : "text-admin-muted hover:text-admin-ink"
            }`}
          >
            ثبت‌نام
          </button>
        </div>


        <div className="mx-auto flex w-full max-w-[420px] flex-col gap-5 rounded-[24px] border border-admin-line bg-white p-6 sm:p-8">
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>


      <div className="relative hidden w-[500px] shrink-0 flex-col justify-between overflow-hidden p-12 lg:flex">
        <SmartImage
          src={images.authBotanical}
          alt=""
          fill
          sizes="500px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-admin-sidebar/45" />

        <div className="relative flex w-full flex-col gap-4">
          <p className="text-right text-[28px] font-black leading-[1.4] text-white">
            شوینده‌های گیاهی سبزینه، پیوند پاکیزگی خانه و دوستی با زمین
          </p>
          <div className="h-[3px] w-20 rounded-full bg-admin-accent" />
        </div>

        <div className="relative flex w-full flex-col gap-3">
          <div className="flex w-full items-center justify-end gap-3">
            <p className="flex-1 text-right text-sm font-semibold text-white">
              ۱۰۰٪ پایه گیاهی و زیست‌تخریب‌پذیر
            </p>
            <ShieldCheck className="size-[18px] text-white" strokeWidth={2} />
          </div>
          <div className="flex w-full items-center justify-end gap-3">
            <p className="flex-1 text-right text-sm font-semibold text-white">
              فاقد تست حیوانی (Cruelty-Free)
            </p>
            <Heart className="size-[18px] text-white" strokeWidth={2} />
          </div>
          <div className="flex w-full items-center justify-end gap-3">
            <p className="flex-1 text-right text-sm font-semibold text-white">
              رایحه‌های غنی از اسانس‌های خالص گل‌ها
            </p>
            <Flower2 className="size-[18px] text-white" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
