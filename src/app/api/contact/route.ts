import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { API_BASE } from "@/lib/http";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const session = await auth();
  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }

  let apiRes: Response;
  try {
    apiRes = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        userId: session?.user?.id,
        phone: body.phone,
        subject: body.subject?.trim() || "No subject",
        message,
        date: new Date().toISOString(),
        status: "pending",
        reply: null,
        repliedAt: null,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: 'The API server is unavailable. Make sure "npm run api" is running.' },
      { status: 503 }
    );
  }

  if (!apiRes.ok) {
    return NextResponse.json({ error: "Failed to send your message." }, { status: apiRes.status });
  }

  const data = await apiRes.json();
  return NextResponse.json(data, { status: 201 });
}
