import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { isStaff, type DataSession } from "@/app/api/data/authorization";
import { MAX_IMAGE_SIZE, uploadImageToStorage, validateImage } from "@/lib/storage/cloudinary";

export async function POST(request: NextRequest) {
  const rawSession = (await auth()) as DataSession;
  if (!isStaff(rawSession)) {
    return NextResponse.json(
      { error: "You are not authorized." },
      { status: rawSession?.user ? 403 : 401 }
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file was provided." }, { status: 400 });
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Image size must not exceed 2 MB." }, { status: 400 });
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
      { error: "Image upload failed. Check your storage settings." },
      { status: 502 }
    );
  }
}

export const maxDuration = 30;
export const runtime = "nodejs";
