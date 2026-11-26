import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/features/dashboard/components/PageHeader";
import SettingsForm from "@/features/dashboard/components/SettingsForm";

export const metadata: Metadata = {
  title: "Settings | Admin",
  description: "General, shipping, payment and notification settings.",
};

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader
        title="Store settings"
        description="Manage general info, shipping, payments and notifications"
      />

      <Suspense fallback={null}>
        <SettingsForm />
      </Suspense>
    </>
  );
}
