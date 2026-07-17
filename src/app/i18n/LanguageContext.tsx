import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type TranslationDict } from "./translations";

export type Lang = "es" | "en";

const STORAGE_KEY = "agerecovery-lang";

interface LanguageContextValue {
  lang: Lang;
  /** Traduce una clave con notación de puntos, ej. t("nav.treatments"). */
  t: (key: string) => string;
  /** Acceso directo al diccionario completo del idioma activo (para arrays u objetos, ej. listas). */
  dict: TranslationDict;
  toggleLanguage: () => void;
  setLanguage: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "en") return stored;
  return "es";
}

function resolveKey(dict: TranslationDict, key: string): string {
  const parts = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = dict;
  for (const part of parts) {
    if (current == null) break;
    current = current[part];
  }
  if (typeof current !== "string") {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Falta la clave de traducción: "${key}"`);
    }
    return key;
  }
  return current;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = translations[lang];
    return {
      lang,
      t: (key: string) => resolveKey(dict, key),
      dict,
      toggleLanguage: () => setLang((prev) => (prev === "es" ? "en" : "es")),
      setLanguage: setLang,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de un <LanguageProvider>");
  }
  return ctx;
}
