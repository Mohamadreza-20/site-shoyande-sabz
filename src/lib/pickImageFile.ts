import type { ChangeEvent } from "react";
import { toast } from "sonner";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export function pickImageFile(event: ChangeEvent<HTMLInputElement>): File | null {
  const file = event.target.files?.[0];
  if (!file) return null;
  const error = !file.type.startsWith("image/")
    ? "Please choose a valid image file."
    : file.size > MAX_IMAGE_BYTES
      ? "Image must be 2 MB or smaller."
      : null;
  if (error) {
    event.target.value = "";
    toast.error(error);
    return null;
  }
  return file;
}
