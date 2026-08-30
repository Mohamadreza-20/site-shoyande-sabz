import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/features/dashboard/components/PageHeader";
import MessagesPanel from "@/features/messages/components/MessagesPanel";
import MessagesStats from "@/features/messages/components/MessagesStats";
import { getMessages } from "@/features/messages/api";

export const metadata: Metadata = {
  title: "پیام‌های تماس با ما | پنل مدیریت شست‌وشو سبز",
  description: "مشاهده و پاسخ‌گویی به پیام‌های ارسالی مشتریان از فرم تماس با ما.",
};

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const fetchedAt = Date.now();

  return (
    <>
      <PageHeader
        title="پیام‌های تماس با ما"
        description="پیام‌های ارسالی مشتریان از فرم تماس با ما را مشاهده و پاسخ دهید"
      />

      <MessagesStats initialMessages={messages} fetchedAt={fetchedAt} />

      <Suspense fallback={null}>
        <MessagesPanel initialMessages={messages} fetchedAt={fetchedAt} />
      </Suspense>
    </>
  );
}
