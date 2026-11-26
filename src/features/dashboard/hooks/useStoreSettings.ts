"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "shooyande-sabz:store-settings";

type SettingsRecord = Record<string, string>;

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? "";
}

function getServerSnapshot() {
  return "";
}

function parseSettings(raw: string): SettingsRecord {
  if (!raw) return {};
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(([, entry]) => typeof entry === "string")
    ) as SettingsRecord;
  } catch {
    return {};
  }
}

export function useStoreSettings({ restoreKey }: { restoreKey?: string } = {}) {
  const formRef = useRef<HTMLFormElement>(null);
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const saved = useMemo(() => parseSettings(raw), [raw]);
  const [edits, setEdits] = useState<SettingsRecord>({});
  const [editsKey, setEditsKey] = useState(restoreKey);

  if (editsKey !== restoreKey) {
    setEditsKey(restoreKey);
    setEdits({});
  }

  const settings = useMemo(() => ({ ...saved, ...edits }), [saved, edits]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    Object.entries(saved).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLInputElement && field.type === "checkbox") {
        field.checked = value === "true";
      } else if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.value = value;
      }
    });
  }, [restoreKey, saved]);

  const setSetting = useCallback((name: string, value: string | boolean) => {
    setEdits((current) => ({ ...current, [name]: String(value) }));
  }, []);

  const getBoolean = useCallback(
    (name: string, fallback = false) =>
      settings[name] === undefined ? fallback : settings[name] === "true",
    [settings]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const formValues = Object.fromEntries(
        [...formData.entries()].map(([key, value]) => [key, String(value)])
      ) as SettingsRecord;
      const next = { ...saved, ...formValues, ...edits };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      listeners.forEach((listener) => listener());
      setEdits({});
      toast.success("Settings saved in your browser.");
    },
    [saved, edits]
  );

  return { formRef, settings, getBoolean, setSetting, handleSubmit };
}
