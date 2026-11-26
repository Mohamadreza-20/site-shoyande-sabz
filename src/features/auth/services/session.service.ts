import { signIn } from "next-auth/react";
import type { SignupInput } from "../validation";
import type { ActionResult, AuthUser } from "../types";

export function mapSessionUser(
  user:
    | {
        id: string;
        name?: string | null;
        email?: string | null;
        phone: string;
        role: AuthUser["role"];
        wishlist?: string[];
        active?: boolean;
      }
    | null
    | undefined
): AuthUser | null {
  if (!user || user.active === false) return null;
  return {
    id: user.id,
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone,
    role: user.role,
    wishlist: user.wishlist ?? [],
  };
}

export async function loginWithCredentials(
  identifier: string,
  password: string,
  refreshSession: () => Promise<unknown>
): Promise<ActionResult> {
  const result = await signIn("credentials", {
    identifier: identifier.trim(),
    password,
    redirect: false,
  });
  if (!result || result.error)
    return { ok: false, error: "Incorrect email/phone number or password." };
  const fresh = (await refreshSession()) as {
    user?: Parameters<typeof mapSessionUser>[0];
  } | null;
  const user = mapSessionUser(fresh?.user);
  return user ? { ok: true, user } : { ok: false, error: "Sign-in failed. Please try again." };
}

export async function signupWithCredentials(
  input: SignupInput,
  refreshSession: () => Promise<unknown>
): Promise<ActionResult> {
  let response: Response;
  try {
    response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input.name.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        password: input.password,
      }),
    });
  } catch {
    return {
      ok: false,
      error: 'The API server is unreachable. Make sure "npm run api" is running.',
    };
  }
  if (response.status === 429)
    return {
      ok: false,
      error: "Too many attempts. Please wait a moment and try again.",
    };
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    return { ok: false, error: data?.error ?? "Sign-up failed." };
  }

  const created = await response.json();
  const signInResult = await signIn("credentials", {
    identifier: created.email,
    password: input.password,
    redirect: false,
  });
  if (!signInResult || signInResult.error)
    return {
      ok: false,
      error: "Your account was created, but automatic sign-in failed. Please sign in.",
    };
  const fresh = (await refreshSession()) as {
    user?: Parameters<typeof mapSessionUser>[0];
  } | null;
  const user = mapSessionUser(fresh?.user);
  return user
    ? { ok: true, user }
    : {
        ok: false,
        error: "Your account was created, but automatic sign-in failed. Please sign in.",
      };
}
