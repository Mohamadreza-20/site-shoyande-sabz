import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { API_BASE, generateId } from "@/lib/http";
import { formatTomanAmount } from "@/lib/money";
import { signupApiSchema } from "@/features/auth/validation";

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "بدنه درخواست نامعتبر است." }, { status: 400 });
  }

  const parsed = signupApiSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "اطلاعات ارسال‌شده نامعتبر است." },
      { status: 400 }
    );
  }

  const { name, email, phone, password } = parsed.data;

  let existingRes: Response;
  let createRes: Response;
  try {
    existingRes = await fetch(`${API_BASE}/customers?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: 'سرور API در دسترس نیست. از اجرا بودن "npm run api" مطمئن شوید.' },
      { status: 503 }
    );
  }

  if (existingRes.ok) {
    const existing = await existingRes.json();
    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json(
        { error: "حسابی با این ایمیل قبلاً ثبت‌نام کرده است." },
        { status: 409 }
      );
    }
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const payload = {
    id: generateId("u"),
    name,
    email,
    phone,
    password: hashedPassword,
    role: "customer" as const,
    ordersCount: 0,
    totalSpent: formatTomanAmount(0),
    joinDate: new Date().toLocaleDateString("fa-IR"),
    status: "active" as const,
    wishlist: [] as string[],
  };

  try {
    createRes = await fetch(`${API_BASE}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return NextResponse.json(
      { error: 'سرور API در دسترس نیست. از اجرا بودن "npm run api" مطمئن شوید.' },
      { status: 503 }
    );
  }

  if (!createRes.ok) {
    return NextResponse.json({ error: "ثبت‌نام با خطا مواجه شد." }, { status: createRes.status });
  }

  const created = (await createRes.json()) as { password: string } & Record<string, unknown>;
  const { password: _omit, ...safeCreated } = created;
  void _omit;
  return NextResponse.json(safeCreated, { status: 201 });
}
