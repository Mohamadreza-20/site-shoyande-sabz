"use client";

import { useEffect, useRef } from "react";

export function useBrowserHydration<T>(read: () => T, onHydrate: (value: T) => void) {
  const readRef = useRef(read);
  const onHydrateRef = useRef(onHydrate);
  useEffect(() => {
    readRef.current = read;
    onHydrateRef.current = onHydrate;
  });

  useEffect(() => {
    onHydrateRef.current(readRef.current());
  }, []);
}
