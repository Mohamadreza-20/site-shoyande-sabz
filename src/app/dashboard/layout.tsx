import { redirect } from "next/navigation";
import { auth } from "@/auth";
<<<<<<< HEAD
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
=======
>>>>>>> origin/main

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || !session.user.active) {
    redirect("/auth");
  }
  if (session.user.role === "customer") {
    redirect("/account");
  }

<<<<<<< HEAD
  return (
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
        {children}
      </main>
      <Sidebar />
    </div>
  );
=======
  return children;
>>>>>>> origin/main
}
