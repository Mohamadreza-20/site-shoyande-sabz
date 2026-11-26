import { NO_INDEX } from "@/lib/seo";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = { title: "My account", robots: NO_INDEX };

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || !session.user.active) {
    redirect("/auth?callbackUrl=/account");
  }
  if (session.user.role !== "customer") {
    redirect("/dashboard");
  }

  return children;
}
