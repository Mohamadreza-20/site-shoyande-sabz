import Link from "next/link";
import ComingSoonButton from "@/components/ComingSoonButton";
import { footerLinks } from "@/lib/site-content";

const footerLinkRoutes: Record<string, string> = {
  "درباره ما": "/about",
  "تماس با ما": "/contact",
};

function FooterLinkColumn({ title, links }: { title: string; links: readonly string[] }) {
  return (
    <div className="flex flex-col items-end gap-3">
      <h4 className="text-[16px] font-bold text-white">{title}</h4>
      {links.map((link) => {
        const route = footerLinkRoutes[link];
        if (route) {
          return (
            <Link
              key={link}
              href={route}
              className="cursor-pointer text-sm text-muted-light transition hover:text-white"
            >
              {link}
            </Link>
          );
        }
        return (
          <ComingSoonButton
            key={link}
            className="text-sm text-muted-light transition hover:text-white"
          >
            {link}
          </ComingSoonButton>
        );
      })}
    </div>
  );
}

export default function FooterLinks() {
  return (
    <div className="flex w-full flex-col items-end gap-8 whitespace-nowrap sm:w-auto sm:flex-row sm:items-start sm:gap-16">
      <FooterLinkColumn title="خدمات مشتریان" links={footerLinks.services} />
      <FooterLinkColumn title="شست‌وشو سبز" links={footerLinks.company} />
    </div>
  );
}
