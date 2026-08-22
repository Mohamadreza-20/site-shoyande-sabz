import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/http";

type ContactBody = {
  name?: string;
  email?: string;
  userId?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "بدنه درخواست نامعتبر است." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "نام، ایمیل و متن پیام الزامی است." },
      { status: 400 }
    );
  }

  let apiRes: Response;
  try {
    apiRes = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        userId: body.userId,
        phone: body.phone,
        subject: body.subject?.trim() || "بدون موضوع",
        message,
        date: new Date().toISOString(),
        status: "pending",
        reply: null,
        repliedAt: null,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: 'سرور API در دسترس نیست. از اجرا بودن "npm run api" مطمئن شوید.' },
      { status: 503 }
    );
  }

  if (!apiRes.ok) {
    return NextResponse.json({ error: "ارسال پیام با خطا مواجه شد." }, { status: apiRes.status });
  }

  const data = await apiRes.json();
  return NextResponse.json(data, { status: 201 });
}
