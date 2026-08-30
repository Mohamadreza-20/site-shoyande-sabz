import type { Metadata } from "next";
import { Suspense } from "react";
<<<<<<< HEAD
=======
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
        <PageHeader
          title="پیام‌های تماس با ما"
          description="پیام‌های ارسالی مشتریان از فرم تماس با ما را مشاهده و پاسخ دهید"
        />

        <MessagesStats initialMessages={messages} fetchedAt={fetchedAt} />

        <Suspense fallback={null}>
          <MessagesPanel initialMessages={messages} fetchedAt={fetchedAt} />
        </Suspense>
      </main>
      <Sidebar />
    </div>
>>>>>>> origin/main
  );
}
