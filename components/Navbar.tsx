"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import { useRegister } from "@/components/RegisterModal";
import { useTranslation } from "@/utils/LanguageProvider";

const languages = [
  { code: "id" as const, label: "Indonesia", flag: "🇮🇩" },
  { code: "en" as const, label: "English", flag: "EN" },
  { code: "ja" as const, label: "日本語", flag: "🇯🇵" },
];

const navLinks = [
  { label: "nav.tentang", href: "#tentang" },
  { label: "nav.program", href: "#program" },
  { label: "nav.galeri", href: "#galeri" },
  { label: "nav.fasilitas", href: "#fasilitas" },
  { label: "nav.testimoni", href: "#testimoni" },
  { label: "nav.faq", href: "#faq" },
  { label: "nav.artikel", href: "#artikel" },
  { label: "nav.kontak", href: "#kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { open: openRegister } = useRegister();
  const { t, lang, setLang } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#lang-dropdown")) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = languages.find((l) => l.code === lang)!;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image
              src="/logo-2.png"
              alt="LPK Bojonegoro Mendunia"
              width={120}
              height={42}
              className="object-contain"
            />
          </Link>

           <nav className="hidden lg:flex items-center gap-1">
             {navLinks.map((link) => (
               <Link
                 key={link.href}
                 href={link.href}
                 className="relative px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#007ab3] transition-colors duration-200 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#007ab3] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
               >
                 {t(link.label)}
               </Link>
             ))}
           </nav>

          <div className="hidden lg:flex items-center gap-2">
            <div className="relative" id="lang-dropdown">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100/80 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-semibold">{currentLang.flag}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        lang === l.code
                          ? "bg-[#007ab3]/5 text-[#007ab3] font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-xs">{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#007ab3]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggle}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100/80 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={openRegister}
              className="px-5 py-2.5 text-sm font-semibold bg-[#007ab3] text-white rounded-lg hover:bg-[#00608e] transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              {t("nav.daftar")}
            </button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100/80 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-[#007ab3] hover:bg-[#007ab3]/5 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.label)}
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                {t("nav.language")}
              </p>
              <div className="flex gap-2 px-4">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                      lang === l.code
                        ? "border-[#007ab3] bg-[#007ab3]/5 text-[#007ab3]"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { toggle(); setMobileOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-[#007ab3] hover:bg-[#007ab3]/5 rounded-lg transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === "dark" ? t("nav.modeTerang") : t("nav.modeGelap")}
            </button>

            <button
              onClick={() => { openRegister(); setMobileOpen(false); }}
              className="mt-2 px-4 py-3 text-sm font-semibold bg-[#007ab3] text-white rounded-lg text-center hover:bg-[#00608e] transition-colors cursor-pointer"
            >
              {t("nav.daftar")}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
