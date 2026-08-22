import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

function isAllowedImageType(type: string): type is AllowedImageType {
  return ALLOWED_IMAGE_TYPES.includes(type as AllowedImageType);
}

function hasValidImageSignature(bytes: Uint8Array, type: AllowedImageType): boolean {
  if (type === "image/jpeg") {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (type === "image/png") {
    return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  }
  if (type === "image/gif") {
    return (
      bytes[0] === 0x47 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x38 &&
      (bytes[4] === 0x37 || bytes[4] === 0x39) &&
      bytes[5] === 0x61
    );
  }
  if (type === "image/webp") {
    return (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  }
  return false;
}

export function validateImage(file: File, bytes: Uint8Array): { ok: true } | { ok: false; message: string } {
  if (!isAllowedImageType(file.type)) {
    return { ok: false, message: "لطفاً یک فایل تصویری معتبر انتخاب کنید." };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { ok: false, message: "حجم تصویر نباید بیشتر از ۲ مگابایت باشد." };
  }
  if (!hasValidImageSignature(bytes, file.type)) {
    return { ok: false, message: "محتوای فایل با نوع تصویر انتخاب‌شده مطابقت ندارد." };
  }
  return { ok: true };
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
}

function getExtension(type: AllowedImageType): string {
  if (type === "image/jpeg") return ".jpg";
  if (type === "image/png") return ".png";
  if (type === "image/webp") return ".webp";
  return ".gif";
}

async function uploadImageLocally(file: File): Promise<string> {
  if (!isAllowedImageType(file.type)) {
    throw new Error("image-type-not-supported");
  }

  const extension = getExtension(file.type);
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${extension}`;
  const directory = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(directory, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(directory, filename), bytes);
  return `/uploads/products/${filename}`;
}

export async function uploadImageToStorage(file: File): Promise<string> {
  if (!isCloudinaryConfigured()) {
    if (process.env.NODE_ENV !== "development") {
      throw new Error("image-storage-not-configured");
    }
    return uploadImageLocally(file);
  }

  const cloudName = CLOUDINARY_CLOUD_NAME;
  const uploadPreset = CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("image-storage-not-configured");
  }

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", uploadPreset);
  body.append("folder", "shooyande-sabz/products");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body, cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("image-storage-upload-failed");
  }

  const data = (await response.json()) as { secure_url?: string };
  if (!data.secure_url) {
    throw new Error("image-storage-invalid-response");
  }

  return data.secure_url;
}
