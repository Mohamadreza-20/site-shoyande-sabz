import type { ReactNode } from "react";
import PageTransition from "@/components/motion/PageTransition";
import ScrollToTopOnRouteChange from "@/components/ScrollToTopOnRouteChange";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
