import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { usePageNavigation } from "@/lib/hooks/usePageParam";

const SEARCH_DEBOUNCE_MS = 400;

export function useUrlListState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { requestedPage, setPage, clampPage } = usePageNavigation({ scrollToTop: true });

  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);
  const searchChanged = debouncedSearch.trim() !== (searchParams.get("q") ?? "");

  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  useEffect(() => {
    const currentParams = searchParamsRef.current;
    const params = new URLSearchParams(currentParams.toString());
    const trimmed = debouncedSearch.trim();
    if (trimmed) params.set("q", trimmed);
    else params.delete("q");
    if (trimmed !== (currentParams.get("q") ?? "")) params.delete("page");
    const nextQuery = params.toString();
    if (nextQuery !== currentParams.toString()) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [debouncedSearch, pathname, router]);

  return {
    search,
    setSearch,
    debouncedSearch,
    queryPage: searchChanged ? 1 : requestedPage,
    page: requestedPage,
    setPage,
    clampPage,
  };
}
