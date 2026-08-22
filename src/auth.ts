import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { API_BASE } from "@/lib/http";
import { findAccountByIdentifier } from "@/features/customers/lib";
import type { Customer, UserRole } from "@/features/customers/types";

const credentialsSchema = z.object({
  identifier: z.string().trim().min(1),
  password: z.string().min(1),
});

const REVALIDATE_INTERVAL_MS = 5 * 60 * 1000;

async function fetchCustomers(): Promise<Customer[]> {
  const res = await fetch(`${API_BASE}/customers`, { cache: "no-store" });
  if (!res.ok) throw new Error("customers-fetch-failed");
  return (await res.json()) as Customer[];
}

async function fetchCustomer(id: string): Promise<Customer | null> {
  const res = await fetch(`${API_BASE}/customers/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("customer-fetch-failed");
  return (await res.json()) as Customer;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  pages: { signIn: "/auth" },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        identifier: { label: "ایمیل یا شماره تلفن", type: "text" },
        password: { label: "رمز عبور", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { identifier, password } = parsed.data;

        let customers: Customer[];
        try {
          customers = await fetchCustomers();
        } catch {
          return null;
        }

        const account = findAccountByIdentifier(customers, identifier);
        if (!account) return null;
        if (account.status === "inactive") return null;

        const passwordMatches = await bcrypt.compare(password, account.password);
        if (!passwordMatches) return null;

        return {
          id: account.id,
          name: account.name,
          email: account.email,
          phone: account.phone,
          role: account.role,
          wishlist: account.wishlist ?? [],
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.phone = (user as { phone: string }).phone;
        token.role = (user as { role: UserRole }).role;
        token.wishlist = (user as { wishlist: string[] }).wishlist ?? [];
        token.active = true;
        token.revalidatedAt = Date.now();
        return token;
      }

      if (trigger === "update" && session) {
        if (session.wishlist) token.wishlist = session.wishlist as string[];
        if (session.name) token.name = session.name as string;
        if (session.email) token.email = session.email as string;
        if (session.phone) token.phone = session.phone as string;
      }

      const shouldRevalidate =
        typeof token.id === "string" &&
        (!token.revalidatedAt || Date.now() - (token.revalidatedAt as number) > REVALIDATE_INTERVAL_MS);

      if (shouldRevalidate) {
        try {
          const account = await fetchCustomer(token.id as string);
          if (!account || account.status === "inactive") {
            token.active = false;
          } else {
            token.role = account.role;
            token.wishlist = account.wishlist ?? [];
            token.active = true;
          }
        } catch {}
        token.revalidatedAt = Date.now();
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phone = token.phone as string;
        session.user.role = token.role as UserRole;
        session.user.wishlist = (token.wishlist as string[]) ?? [];
        session.user.active = token.active !== false;
      }
      return session;
    },
  },
});
