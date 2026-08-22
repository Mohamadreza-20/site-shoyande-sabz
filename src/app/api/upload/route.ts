import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import {
  MAX_IMAGE_SIZE,
  uploadImageToStorage,
  validateImage,
} from "@/lib/storage/cloudinary";

type Role = "customer" | "manager" | "support";
type Session = { user?: { id: string; role: Role; active: boolean } } | null;
const STAFF: Role[] = ["manager", "support"];

function isStaff(session: Session): boolean {
  return !!session?.user && session.user.active && STAFF.includes(session.user.role);
}

export async function POST(request: NextRequest) {
  const rawSession = (await auth()) as Session;
  if (!isStaff(rawSession)) {
    return NextResponse.json(
      { error: "دسترسی مجاز نیست." },
      { status: rawSession?.user ? 403 : 401 }
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "فایلی ارسال نشده است." }, { status: 400 });
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "حجم تصویر نباید بیشتر از ۲ مگابایت باشد." }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const validation = validateImage(file, bytes);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  try {
    const url = await uploadImageToStorage(file);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      { error: "آپلود تصویر انجام نشد. تنظیمات ذخیره‌سازی را بررسی کنید." },
      { status: 502 }
    );
  }
}

export const maxDuration = 30;
export const runtime = "nodejs";
