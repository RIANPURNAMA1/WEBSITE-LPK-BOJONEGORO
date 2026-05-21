"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LangCode = "id" | "en" | "ja";

const LanguageContext = createContext({
  lang: "id" as LangCode,
  setLang: (lang: LangCode) => {},
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
    // Also update the html lang attribute for accessibility and SEO
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);