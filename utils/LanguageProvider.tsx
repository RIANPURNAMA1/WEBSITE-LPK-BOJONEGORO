"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { translations, Lang } from "./translations";

type LangCode = Lang;

const LanguageContext = createContext({
  lang: "id" as LangCode,
  setLang: (_lang: LangCode) => {},
  t: (_key: string): string => "",
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangCode>("id");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as LangCode | null;
    if (stored && ["id", "en", "ja"].includes(stored)) {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry["id"] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);
