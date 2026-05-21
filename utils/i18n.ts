import { useLanguage } from "@/components/LanguageProvider";
import id from "../locales/id.json";
import en from "../locales/en.json";
import ja from "../locales/ja.json";

const locales: Record<string, Record<string, any>> = { id, en, ja };

export const t = (key: string, lang: string): string => {
  const keys = key.split(".");
  let result: any = locales[lang] || locales["id"];
  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = result[k];
    } else {
      return key;
    }
  }
  if (typeof result !== "string") return key;
  return result;
};

export const useTranslation = () => {
  const { lang } = useLanguage();
  return (key: string) => t(key, lang);
};
