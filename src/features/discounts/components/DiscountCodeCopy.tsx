"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function DiscountCodeCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("کد تخفیف کپی شد.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("کپی کردن کد تخفیف انجام نشد.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="cursor-pointer flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
    >
      {copied ? <Check className="size-4" strokeWidth={2.5} /> : <Copy className="size-4" strokeWidth={2.5} />}
      <span dir="ltr">{code}</span>
    </button>
  );
}
