import type { Metadata } from "next";
import { NO_INDEX } from "@/lib/seo";
import AuthPortal from "@/features/auth/components/AuthPortal";

export const metadata: Metadata = {
  title: "Sign in | Create account",
  robots: NO_INDEX,
  description: "Sign in or create an account to shop and manage orders at Leafwash.",
};

export default function AuthPage() {
  return <AuthPortal />;
}
