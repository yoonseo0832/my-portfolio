"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ko from "@/locales/ko.json";
import en from "@/locales/en.json";
type Locale = "ko" | "en";
type Dictionary = typeof ko;
const dictionaries: Record<Locale, Dictionary> = { ko, en };
const LanguageContext = createContext<{
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string;
} | null>(null);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-locale");
    if (saved === "ko" || saved === "en") {
      const timer = window.setTimeout(() => setLocale(saved), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);
  const toggleLocale = () =>
    setLocale((old) => {
      const next = old === "ko" ? "en" : "ko";
      localStorage.setItem("portfolio-locale", next);
      return next;
    });
  const t = useMemo(
    () => (key: string) => {
      const value = key
        .split(".")
        .reduce<unknown>(
          (item, part) => (item as Record<string, unknown>)?.[part],
          dictionaries[locale],
        );
      return typeof value === "string" ? value : key;
    },
    [locale],
  );
  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useTranslation() {
  const value = useContext(LanguageContext);
  if (!value)
    throw new Error("useTranslation must be used within LanguageProvider");
  return value;
}
