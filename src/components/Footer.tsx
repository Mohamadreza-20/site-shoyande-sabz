import Link from "next/link";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import FooterLinks from "@/components/FooterLinks";
import FooterSocial from "@/components/FooterSocial";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="mx-4 mb-4 mt-10 rounded-[36px] bg-brand-700 sm:mx-6 lg:mx-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-12 px-6 pb-10 pt-14 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex max-w-[360px] flex-col items-start gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-accent">
                <Leaf className="size-5 text-brand-700" strokeWidth={2.25} />
              </span>
              <span className="font-display text-2xl font-extrabold text-white">Leafwash</span>
            </Link>
            <p className="text-sm leading-[1.7] text-muted-light">
              Plant-based, refillable cleaning for a brilliant home that is kind to your family and
              to the planet we share.
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-light">
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-accent" /> +1 (555) 014-2290
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-accent" /> hello@leafwash.example
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-accent" /> 214 Greenhouse Row, Portland, OR
              </li>
            </ul>
          </div>
          <FooterLinks />
          <NewsletterForm />
        </div>

        <hr className="border-white/10" />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-[13px] text-muted-light">
            © {new Date().getFullYear()} Leafwash. All rights reserved.
          </p>
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}
