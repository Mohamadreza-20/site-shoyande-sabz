"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "shooyande-sabz:store-settings";

type SettingsRecord = Record<string, string>;

function readSettings(): SettingsRecord {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(([, entry]) => typeof entry === "string")
    ) as SettingsRecord;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return {};
  }
}

export function useStoreSettings({ restoreKey }: { restoreKey?: string } = {}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [settings, setSettings] = useState<SettingsRecord>({});

  const restoreSettings = useCallback(() => {
    const saved = readSettings();
    setSettings(saved);

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
  }, []);

  useEffect(() => {
    restoreSettings();
  }, [restoreKey, restoreSettings]);

  const setSetting = useCallback((name: string, value: string | boolean) => {
    setSettings((current) => ({ ...current, [name]: String(value) }));
  }, []);

  const getBoolean = useCallback(
    (name: string, fallback = false) => settings[name] === undefined ? fallback : settings[name] === "true",
    [settings]
  );

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const current = readSettings();
    const formValues = Object.fromEntries(
      [...formData.entries()].map(([key, value]) => [key, String(value)])
    ) as SettingsRecord;
    const next = { ...current, ...formValues, ...settings };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSettings(next);
    toast.success("تنظیمات در مرورگر ذخیره شد.");
  }, [settings]);

  return { formRef, settings, getBoolean, setSetting, handleSubmit };
}
