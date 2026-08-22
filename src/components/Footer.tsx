import { Leaf } from "lucide-react";
import FooterLinks from "@/components/FooterLinks";
import FooterSocial from "@/components/FooterSocial";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-700">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 pb-10 pt-16 lg:px-[120px]">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
          <NewsletterForm />
          <FooterLinks />


          <div className="flex w-full max-w-[300px] flex-col items-end gap-4 text-right">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">شست‌وشو سبز</span>
              <span className="flex size-8 items-center justify-center rounded-[10px] bg-brand-400">
                <Leaf className="size-[18px] text-white" strokeWidth={2} />
              </span>
            </div>
            <p className="text-sm leading-[1.6] text-muted-light">
              انتخابی آگاهانه برای تمیزی درخشان خانه شما بدون هیچ تهدیدی برای سلامتی خانواده و بقای
              سیاره زیبای زمین.
            </p>
          </div>
        </div>

        <hr className="border-white/10" />

        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
          <FooterSocial />
          <p className="text-[13px] text-muted-light">
            © ۱۴۰۴ شست‌وشو سبز — تمام حقوق مادی و معنوی محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
