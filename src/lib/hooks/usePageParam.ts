import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function usePageNavigation({ scrollToTop = false } = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const requestedPage = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;

  const buildUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page > 1) params.set("page", String(page));
      else params.delete("page");
      const query = params.toString();
      return query ? `${pathname}?${query}` : pathname;
    },
    [pathname, searchParams]
  );

  const setPage = useCallback(
    (page: number) => {
      router.push(buildUrl(page), { scroll: false });
      if (scrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [buildUrl, router, scrollToTop]
  );

  const clampPage = useCallback(
    (totalPages: number) => {
      if (requestedPage > totalPages) router.replace(buildUrl(totalPages), { scroll: false });
    },
    [buildUrl, requestedPage, router]
  );

  return { requestedPage, setPage, clampPage };
}

export function usePageParam(totalPages = Infinity, options?: { scrollToTop?: boolean }) {
  const { requestedPage, setPage, clampPage } = usePageNavigation(options);

  useEffect(() => {
    clampPage(totalPages);
  }, [clampPage, totalPages]);

  return { page: Math.min(requestedPage, totalPages), requestedPage, setPage };
}
