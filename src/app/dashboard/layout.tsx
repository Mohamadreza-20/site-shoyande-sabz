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
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <div className="order-1 lg:order-2">
        <Sidebar />
      </div>
      <main className="order-2 flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8 lg:order-1">
        <TopHeader />
        {children}
      </main>
    </div>
  );
}
