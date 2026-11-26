import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarkerLabelProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export default function MarkerLabel({ children, as: Tag = "span", className }: MarkerLabelProps) {
  return (
    <Tag className={cn("marker font-display font-extrabold text-brand-700", className)}>
      {children}
    </Tag>
  );
}
