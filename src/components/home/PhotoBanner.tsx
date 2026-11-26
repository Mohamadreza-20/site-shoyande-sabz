import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { ArrowRight } from "lucide-react";

export default function PhotoBanner({
  src,
  title,
  eyebrow,
  href,
  cta,
}: {
  src: string;
  title: string;
  eyebrow: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-[60px]">
      <div className="relative h-[260px] overflow-hidden rounded-[32px] bg-brand-600 sm:h-[340px] lg:h-[400px]">
        <SmartImage
          src={src}
          alt=""
          fill
          sizes="(max-width: 1440px) 100vw, 1320px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-700/80 via-brand-700/30 to-transparent" />
        <div className="relative flex h-full flex-col items-start justify-end gap-4 p-6 sm:p-10 lg:p-14">
          <span className="rounded-full bg-accent px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
            {eyebrow}
          </span>
          <h2 className="font-display max-w-[560px] text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[52px]">
            {title}
          </h2>
          <Link
            href={href}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 transition hover:bg-accent"
          >
            {cta}
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
