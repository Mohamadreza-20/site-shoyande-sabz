"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
<<<<<<< HEAD
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
=======
>>>>>>> origin/main
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
