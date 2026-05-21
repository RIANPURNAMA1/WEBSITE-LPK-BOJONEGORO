"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useTranslation } from "@/utils/i18n";
import { useRegister } from "@/components/RegisterModal";

const navLinks = [
  { label: "navbar.links.tentang", href: "#tentang" },
  { label: "navbar.links.program", href: "#program" },
  { label: "navbar.links.galeri", href: "#galeri" },
  { label: "navbar.links.fasilitas", href: "#fasilitas" },
  { label: "navbar.links.testimoni", href: "#testimoni" },
  { label: "navbar.links.faq", href: "#faq" },
  { label: "navbar.links.artikel", href: "#artikel" },
  { label: "navbar.links.kontak", href: "#kontak" },
];

const languages = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "EN" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
] as const;

type LangCode = "id" | "en" | "ja";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();
  const t = useTranslation();
  const { open: openRegister } = useRegister();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src={theme === "dark" ? "/logo-1.png" : "/logo-2.png"}
              alt="LPK Bojonegoro Mendunia"
              className="h-30 w-auto"
            />
          </Link>

           {/* Desktop Nav */}
           <nav className="hidden lg:flex items-center gap-6">
             {navLinks.map((link) => (
               <Link
                 key={link.href}
                 href={link.href}
                 className="text-sm font-medium text-gray-600 hover:text-[#007ab3] transition-colors"
               >
                 {t(link.label)}
               </Link>
             ))}
           </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">

            {/* Language Dropdown */}
            <div className="relative" id="lang-dropdown">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-slate-100 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag}</span>
                <span className="text-xs">{currentLang.label}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-100 rounded-md shadow-lg overflow-hidden z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        lang === l.code
                          ? "bg-[#007ab3]/5 text-[#007ab3] font-semibold"
                          : "text-gray-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#007ab3]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode */}
            <button
              onClick={toggle}
              className="p-2 rounded-md text-gray-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA */}
            <button
              onClick={openRegister}
              className="px-4 py-2 text-sm font-semibold bg-[#007ab3] text-white rounded-md hover:bg-[#00608e] transition-colors cursor-pointer"
            >
              {t("navbar.daftarSekarang")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#007ab3] hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.label)}
              </Link>
            ))}

            {/* Language Switcher Mobile */}
            <div className="mt-2 pt-2 border-t border-slate-100">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t("navbar.language")}
              </p>
              <div className="flex gap-2 px-3">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium border transition-colors ${
                      lang === l.code
                        ? "border-[#007ab3] bg-[#007ab3]/5 text-[#007ab3]"
                        : "border-slate-200 text-gray-500 hover:border-slate-300"
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
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#007ab3] hover:bg-blue-50 rounded-md transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === "dark" ? t("navbar.modeTerang") : t("navbar.modeGelap")}
            </button>

            <button
              onClick={() => { openRegister(); setMobileOpen(false); }}
              className="mt-1 px-4 py-2.5 text-sm font-semibold bg-[#007ab3] text-white rounded-md text-center cursor-pointer"
            >
              {t("navbar.daftarSekarang")}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}