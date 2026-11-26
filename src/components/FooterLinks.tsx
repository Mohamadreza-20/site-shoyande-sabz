import Link from "next/link";
import { footerLinks } from "@/lib/site-content";

type FooterLink = (typeof footerLinks.services | typeof footerLinks.company)[number];

const footerLinkRoutes: Record<FooterLink, string> = {
  "About us": "/about",
  "Contact us": "/contact",
  "Help center": "/contact",
  "Shipping & payment": "/contact#faq",
  "Returns policy": "/contact#faq",
  FAQ: "/contact#faq",
  "Our farms": "/about",
  "Sustainability report": "/about",
};

function FooterLinkColumn({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <h2 className="font-display text-base font-bold text-accent">{title}</h2>
      {links.map((link) => {
        return (
          <Link
            key={link}
            href={footerLinkRoutes[link]}
            className="-my-1.5 py-2.5 text-left text-sm text-muted-light transition hover:text-white"
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-8 lg:col-span-1">
      <FooterLinkColumn title="Customer care" links={footerLinks.services} />
      <FooterLinkColumn title="Leafwash" links={footerLinks.company} />
    </div>
  );
}
