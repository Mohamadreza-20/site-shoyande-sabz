import type { Metadata } from "next";
import AuthPortal from "@/features/auth/components/AuthPortal";

export const metadata: Metadata = {
  title: "ورود | ثبت‌نام | سبزینه پاک",
  description: "ورود به حساب کاربری یا ایجاد حساب جدید در پنل مدیریت و فروشگاه سبزینه پاک.",
};

export default function AuthPage() {
  return <AuthPortal />;
}
