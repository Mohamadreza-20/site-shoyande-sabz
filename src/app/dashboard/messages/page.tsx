import { fetchedAtNow } from "@/lib/http";
import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/features/dashboard/components/PageHeader";
import MessagesPanel from "@/features/messages/components/MessagesPanel";
import MessagesStats from "@/features/messages/components/MessagesStats";
import { getMessages } from "@/features/messages/api";

export const metadata: Metadata = {
  title: "Contact messages | Admin",
  description: "View and answer customer messages from the contact form.",
};

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const fetchedAt = fetchedAtNow();

  return (
    <>
      <PageHeader
        title="Contact messages"
        description="View and answer messages sent through the contact form"
      />

      <MessagesStats initialMessages={messages} fetchedAt={fetchedAt} />

      <Suspense fallback={null}>
        <MessagesPanel initialMessages={messages} fetchedAt={fetchedAt} />
      </Suspense>
    </>
  );
}
