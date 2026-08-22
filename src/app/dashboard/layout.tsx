import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || !session.user.active) {
    redirect("/auth");
  }
  if (session.user.role === "customer") {
    redirect("/account");
  }

  return children;
}
