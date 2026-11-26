import Link from "next/link";
import { Fragment } from "react";
import MarkerLabel from "@/components/ui/MarkerLabel";

export type Crumb = { label: string; href?: string };

export default function BlogHeader({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-5 px-6 pb-6 pt-10 text-left lg:px-[60px] lg:pt-14">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-muted"
        >
          <Link href="/" className="transition hover:text-brand-400">
            Home
          </Link>
          {crumbs.map((crumb, index) => (
            <Fragment key={crumb.label}>
              <span aria-hidden>/</span>
              {crumb.href && index < crumbs.length - 1 ? (
                <Link href={crumb.href} className="transition hover:text-brand-400">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-bold text-brand-700">{crumb.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
        <h1 className="text-4xl leading-tight sm:text-5xl">
          <MarkerLabel>The Green Journal</MarkerLabel>
        </h1>
        <p className="max-w-[560px] text-base leading-[1.7] text-muted">
          Tips, guides and stories on natural cleaning, healthy homes and caring for the planet.
        </p>
      </div>
    </section>
  );
}
