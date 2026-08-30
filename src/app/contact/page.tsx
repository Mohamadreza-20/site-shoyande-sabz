import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/features/messages/components/ContactForm";

export const metadata: Metadata = {
  title: "تماس با ما | شست‌وشو سبز",
  description: "راه‌های ارتباطی با تیم شست‌وشو سبز؛ تماس تلفنی، ایمیل، آدرس و فرم تماس آنلاین.",
};

const contactInfo = [
  { icon: Phone, title: "تماس تلفنی", detail: "۰۲۱-۹۱۰۰۰۰۰۰" },
  { icon: Mail, title: "ایمیل", detail: "info@shooyande-sabz.ir" },
  { icon: MapPin, title: "آدرس", detail: "تهران، خیابان ولیعصر، پلاک ۱۲۰" },
  { icon: Clock, title: "ساعات پاسخگویی", detail: "شنبه تا پنجشنبه، ۹ تا ۱۸" },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-50">
      <Navbar />
      <main className="flex w-full flex-col">

        <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-3 px-6 pt-16 text-center lg:px-[120px]">
          <span className="rounded-full bg-brand-300 px-4 py-1.5 text-[13px] font-bold text-brand-500">
            در ارتباط باشید
          </span>
          <h1 className="text-2xl font-black text-brand-700 sm:text-[32px]">تماس با ما</h1>
          <p className="max-w-[560px] text-[15px] leading-[1.6] text-muted">
            سوالی درباره محصولات دارید یا می‌خواهید نظرتان را با ما در میان بگذارید؟ تیم پشتیبانی
            شست‌وشو سبز آماده شنیدن صدای شماست.
          </p>
        </section>


        <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-4 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-[120px]">
          {contactInfo.map(({ icon: Icon, title, detail }) => (
            <div
              key={title}
              className="flex flex-col items-end gap-3 rounded-[20px] border border-brand-200 bg-white p-6 text-right"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-300">
                <Icon className="size-6 text-brand-700" strokeWidth={1.75} />
              </span>
              <h3 className="text-[15px] font-bold text-brand-700">{title}</h3>
              <p dir="ltr" className="text-left text-sm leading-[1.6] text-muted">
                {detail}
              </p>
            </div>
          ))}
        </section>


        <section className="mx-auto flex w-full max-w-[1440px] flex-col-reverse items-start gap-8 px-6 pb-20 lg:flex-row lg:px-[120px]">
          <div className="h-[280px] w-full overflow-hidden rounded-[24px] border border-brand-200 lg:h-auto lg:flex-1 lg:self-stretch">
            <iframe
              title="نقشه موقعیت شست‌وشو سبز"
              src="https://maps.google.com/maps?q=Tehran&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="size-full min-h-[280px] border-0"
              loading="lazy"
            />
          </div>
          <div className="w-full lg:flex-1">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
