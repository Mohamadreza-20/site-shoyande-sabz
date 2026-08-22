"use client";

import Toggle from "./Toggle";

type Props = {
  getBoolean: (name: string, fallback?: boolean) => boolean;
  setSetting: (name: string, value: string | boolean) => void;
};

export default function NotificationsSettings({ getBoolean, setSetting }: Props) {
  return (
    <>
      <Toggle name="newOrderNotifications" label="اعلان سفارش جدید" description="ارسال ایمیل و پیامک به مدیر فروشگاه هنگام ثبت سفارش جدید" checked={getBoolean("newOrderNotifications", true)} onChange={(value) => setSetting("newOrderNotifications", value)} />
      <Toggle name="lowStockNotifications" label="اعلان موجودی رو به اتمام" description="اطلاع‌رسانی زمانی که موجودی یک محصول کمتر از ۱۵ عدد شود" checked={getBoolean("lowStockNotifications", true)} onChange={(value) => setSetting("lowStockNotifications", value)} />
      <Toggle name="newReviewNotifications" label="اعلان نظرات جدید مشتریان" description="اطلاع‌رسانی زمانی که مشتری برای محصولی نظر ثبت می‌کند" checked={getBoolean("newReviewNotifications")} onChange={(value) => setSetting("newReviewNotifications", value)} />
      <Toggle name="adminNewsletter" label="خبرنامه هفتگی برای مدیر" description="ارسال خلاصه عملکرد فروشگاه هر یکشنبه صبح" checked={getBoolean("adminNewsletter", true)} onChange={(value) => setSetting("adminNewsletter", value)} />
    </>
  );
}
