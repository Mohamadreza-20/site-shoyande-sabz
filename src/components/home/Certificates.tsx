import { BadgeCheck, Leaf, PawPrint, Recycle, ShieldCheck } from "lucide-react";
import MarkerLabel from "@/components/ui/MarkerLabel";
import { certificates } from "@/lib/site-content";

const icons = [Leaf, PawPrint, Recycle, ShieldCheck, BadgeCheck];

export default function Certificates() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-[60px] lg:py-20">
      <h2 className="mb-10 text-3xl lg:text-[40px]">
        <MarkerLabel>Certified &amp; verified</MarkerLabel>
      </h2>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {certificates.map((cert, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li
              key={cert.name}
              className="flex flex-col items-center gap-3 text-center max-sm:last:odd:col-span-2"
            >
              <span className="flex size-28 items-center justify-center rounded-full border-[3px] border-dashed border-brand-700/40 bg-white sm:size-32">
                <span className="flex size-20 items-center justify-center rounded-full bg-brand-700 sm:size-24">
                  <Icon className="size-9 text-accent" strokeWidth={1.75} />
                </span>
              </span>
              <p className="font-display text-base font-extrabold text-brand-700">{cert.name}</p>
              <p className="text-xs text-muted">{cert.note}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
