import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || !session.user.active) {
    redirect("/auth");
  }
  if (session.user.role === "customer") {
    redirect("/account");
  }

  return (
    <div className="min-h-screen w-full bg-admin-bg">
      <Sidebar />
      <main className="flex min-w-0 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8 lg:mr-[280px]">
        <TopHeader />
        {children}
      </main>
    </div>
  );
}
