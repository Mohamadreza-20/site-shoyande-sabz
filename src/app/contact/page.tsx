import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/ui/FaqAccordion";
import MarkerLabel from "@/components/ui/MarkerLabel";
import DiscImage from "@/components/ui/DiscImage";
import ContactForm from "@/features/messages/components/ContactForm";
import { images } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with the Leafwash team by phone, email, in person or through our online inquiry form.",
};

const contactInfo = [
  { icon: Phone, title: "Call us", detail: "+1 (503) 555-0142" },
  { icon: Mail, title: "Email", detail: "hello@greenwash.example" },
  { icon: MapPin, title: "Visit", detail: "120 Willow Street, Portland, OR 97205" },
  { icon: Clock, title: "Support hours", detail: "Mon – Fri, 9am – 6pm PT" },
] as const;

const faqs = [
  {
    q: "Are your products safe for pets and children?",
    a: "Yes. Every formula is plant-based and free from chlorine, ammonia and formaldehyde. Keep all cleaners out of reach of children as a general precaution.",
  },
  {
    q: "Can I request a sample before I order?",
    a: "Absolutely. Send us a message with the product you are curious about and we will ship a free travel-size sample.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders ship within 1–2 business days and usually arrive in 3–5 business days across the US.",
  },
  {
    q: "What is your return policy?",
    a: "If you are not happy with a product, contact us within 30 days and we will make it right with a refund or replacement.",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex w-full flex-col">
        <section className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-4 px-6 pb-6 pt-12 text-left lg:px-[60px] lg:pt-16">
          <h1 className="text-4xl sm:text-5xl">
            <MarkerLabel>Say hello</MarkerLabel>
          </h1>
          <p className="max-w-[560px] text-base leading-[1.7] text-muted">
            Questions about our products, wholesale or sampling? Our support team is happy to help.
          </p>
        </section>

        <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-[60px]">
          {contactInfo.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-start gap-4 text-left">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent">
                <Icon className="size-5 text-brand-700" strokeWidth={2} />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="font-display text-base font-extrabold text-brand-700">{title}</h2>
                <p className="text-sm leading-[1.6] text-muted">{detail}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-8 lg:px-[60px]">
          <div className="grid grid-cols-1 items-center gap-10 rounded-[40px] bg-brand-700 p-6 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:p-14">
            <div className="flex flex-col items-start gap-8 text-left">
              <DiscImage
                src={images.contact}
                alt="Leafwash support team"
                priority
                sizes="(max-width: 1024px) 70vw, 360px"
                className="size-[240px] sm:size-[320px]"
              />
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                  Send an <span className="text-accent">inquiry</span>
                </h2>
                <p className="max-w-[380px] text-sm leading-[1.8] text-brand-200">
                  Tell us what you need and we will reply within one business day.
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        <section
          id="faq"
          className="mx-auto flex w-full max-w-[860px] scroll-mt-20 flex-col gap-8 px-6 py-16 lg:py-24"
        >
          <h2 className="text-3xl sm:text-[40px]">
            <MarkerLabel>FAQ</MarkerLabel>
          </h2>
          <FaqAccordion variant="contact" items={faqs} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
