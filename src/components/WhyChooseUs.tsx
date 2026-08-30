import { Heart, Recycle, ShieldCheck, Sparkles } from "lucide-react";
import { features } from "@/lib/site-content";

const icons = {
  shield: ShieldCheck,
  recycle: Recycle,
  heart: Heart,
  sparkles: Sparkles,
} as const;

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-brand-100">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-6 py-16 lg:px-[120px]">
        <div className="flex max-w-[640px] flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-brand-300 px-4 py-1.5 text-[13px] font-bold text-brand-500">
            تعهد ما به سلامت خانه شما
          </span>
          <h2 className="text-2xl font-black text-brand-700 sm:text-[32px]">
            چرا شوینده‌های گیاهی شست‌وشوی سبز؟
          </h2>
          <p className="text-[15px] leading-[1.6] text-muted">
            ما بر این باوریم که پاکیزگی خانه نباید به قیمت آسیب به ریه‌ها و محیط زیست تمام شود.
            همه محصولات ما با استانداردهای بالای زیستی تولید می‌شوند.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <div
                key={feature.title}
                className="flex flex-col items-end gap-3 rounded-[20px] border border-brand-200 bg-white p-6 text-right"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-300">
                  <Icon className="size-6 text-brand-700" strokeWidth={1.75} />
                </span>
                <h3 className="text-lg font-bold text-brand-700">{feature.title}</h3>
                <p className="text-sm leading-[1.6] text-muted">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
