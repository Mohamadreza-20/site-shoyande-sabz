import type { Metadata } from "next";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { Award, Leaf, ShoppingCart, Sprout, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/WhyChooseUs";
import Ingredients from "@/components/Ingredients";
import { images } from "@/lib/assets";

export const metadata: Metadata = {
  title: "درباره ما | شست‌وشو سبز",
  description:
    "داستان شست‌وشو سبز، تعهد ما به طبیعت و دلیل انتخاب محصولات شوینده گیاهی و ارگانیک.",
};

const stats = [
  { icon: Users, value: "+۵۰,۰۰۰", label: "مشتری راضی" },
  { icon: Sprout, value: "۱۰۰٪", label: "پایه گیاهی" },
  { icon: Award, value: "۸ سال", label: "تجربه و تخصص" },
  { icon: ShoppingCart, value: "+۲۰", label: "محصول متنوع" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-50">
      <Navbar />
      <main className="flex w-full flex-col">

        <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-6 py-16 lg:flex-row-reverse lg:items-center lg:justify-between lg:px-[120px] lg:py-20">
          <div className="relative h-[320px] w-full max-w-[520px] overflow-hidden rounded-[32px] lg:h-[440px]">
            <SmartImage
              src={images.hero}
              alt="داستان برند شست‌وشو سبز"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              priority
              className="object-cover"
            />
          </div>

          <div className="flex w-full max-w-[580px] flex-col items-end gap-6 text-right">
            <span className="rounded-full bg-brand-300 px-4 py-1.5 text-[13px] font-bold text-brand-500">
              داستان ما
            </span>
            <h1 className="text-[32px] font-black leading-[1.25] text-brand-700 sm:text-[40px]">
              شست‌وشو سبز؛ از دل طبیعت تا خانه شما
            </h1>
            <p className="text-[17px] leading-[1.7] text-muted">
              شست‌وشو سبز از یک ایده ساده متولد شد: خانه‌ای پاکیزه نباید به قیمت آسیب به سلامت
              خانواده و محیط زیست تمام شود. ما با گردآوری بهترین عصاره‌های گیاهی و اسانس‌های
              طبیعی، محصولاتی می‌سازیم که هم قدرت پاک‌کنندگی بالایی دارند و هم با وجدان زیستی ما
              سازگارند.
            </p>
            <p className="text-[17px] leading-[1.7] text-muted">
              امروز، هزاران خانواده در سراسر کشور شست‌وشو سبز را برای خانه‌ای درخشان و ایمن انتخاب
              کرده‌اند و ما همچنان در تلاشیم تا فرمولاسیون‌های خود را با الهام از طبیعت بهبود
              ببخشیم.
            </p>
          </div>
        </section>

        <section className="w-full bg-brand-700">
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-8 px-6 py-12 lg:grid-cols-4 lg:px-[120px]">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <span className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                  <Icon className="size-6 text-white" strokeWidth={1.75} />
                </span>
                <span className="text-2xl font-black text-white sm:text-[28px]">{value}</span>
                <span className="text-sm text-muted-light">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <WhyChooseUs />
        <Ingredients />

        <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-6 py-16 text-center lg:px-[120px]">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-300">
            <Leaf className="size-7 text-brand-500" strokeWidth={1.75} />
          </span>
          <h2 className="text-2xl font-black text-brand-700 sm:text-[32px]">
            آماده تجربه‌ی خانه‌ای پاک‌تر و سبزتر هستید؟
          </h2>
          <p className="max-w-[560px] text-[15px] leading-[1.6] text-muted">
            مجموعه کامل محصولات شوینده گیاهی شست‌وشو سبز را ببینید و اولین سفارش خود را ثبت کنید.
          </p>
          <Link
            href="/products"
            className="cursor-pointer flex items-center gap-2 rounded-full bg-brand-400 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-500"
          >
            <ShoppingCart className="size-[18px]" strokeWidth={2} />
            مشاهده محصولات
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
