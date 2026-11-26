import { BadgeCheck, Leaf, PawPrint, Recycle, ShieldCheck } from "lucide-react";

const badges = [
  { icon: Leaf, title: "100% Vegan", sub: "Plant-derived formulas" },
  { icon: PawPrint, title: "Cruelty-Free", sub: "Never tested on animals" },
  { icon: Recycle, title: "Biodegradable", sub: "Readily breaks down in 28 days" },
  { icon: ShieldCheck, title: "ISO 14001", sub: "Environmental management" },
  { icon: BadgeCheck, title: "EcoCert Style", sub: "Natural-origin ingredients" },
] as const;

export default function CertBadges() {
  return (
    <ul className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
      {badges.map(({ icon: Icon, title, sub }) => (
        <li key={title} className="flex flex-col items-center gap-3 text-center">
          <span className="relative flex size-28 items-center justify-center rounded-full border-[3px] border-dashed border-brand-400/60 bg-white">
            <span className="flex size-[84px] items-center justify-center rounded-full bg-brand-700">
              <Icon className="size-9 text-accent" strokeWidth={1.6} />
            </span>
            <span
              aria-hidden
              className="absolute -bottom-1 -left-1 size-7 rounded-full bg-accent"
            />
          </span>
          <span className="font-display text-base font-extrabold text-brand-700">{title}</span>
          <span className="text-xs leading-5 text-muted">{sub}</span>
        </li>
      ))}
    </ul>
  );
}
