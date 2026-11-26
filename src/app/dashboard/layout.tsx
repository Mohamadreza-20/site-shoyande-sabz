import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { NO_INDEX } from "@/lib/seo";
import { auth } from "@/auth";
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";

export const metadata: Metadata = { robots: NO_INDEX };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || !session.user.active) {
    redirect("/auth?callbackUrl=/dashboard");
  }
  if (session.user.role === "customer") {
    redirect("/account");
  }

  return (
    <div className="min-h-screen w-full bg-admin-bg">
      <Sidebar />
      <main className="flex min-w-0 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8 lg:ml-[280px]">
        <TopHeader />
        {children}
      </main>
    </div>
  );
}
