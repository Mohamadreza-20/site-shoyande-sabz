"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { pageVariants, reducedPageVariants } from "@/components/motion/variants";

export default function PageTransition({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={shouldReduceMotion ? reducedPageVariants : pageVariants}
    >
      {children}
    </motion.div>
  );
}
