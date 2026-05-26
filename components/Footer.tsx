"use client";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/utils/LanguageProvider";

const socialLinks = [
  {
    href: "#",
    label: "Instagram",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "TikTok",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Facebook",
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "nav.tentang", href: "#tentang" },
  { label: "nav.program", href: "#program" },
  { label: "nav.galeri", href: "#galeri" },
  { label: "nav.fasilitas", href: "#fasilitas" },
  { label: "nav.testimoni", href: "#testimoni" },
  { label: "nav.faq", href: "#faq" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Footer() {
  const { t } = useTranslation();
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="bg-gray-50 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-16">
        <motion.div variants={container} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div variants={fadeUp}>
            <Image
              src="/logo-2.png"
              alt="LPK Bojonegoro Mendunia"
              width={140}
              height={50}
              className="object-contain mb-5"
            />
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              {t("footer.desc")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-md border border-slate-200 text-slate-400 flex items-center justify-center hover:border-[#007ab3] hover:text-[#007ab3] hover:bg-[#007ab3]/5 transition-colors"
                >
                  {svg}
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">{t("footer.menu")}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-slate-500 hover:text-[#007ab3] transition-colors">
                    {t(label)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">{t("footer.program")}</h4>
            <ul className="space-y-2.5">
              <li><a href="#program" className="text-sm text-slate-500 hover:text-[#007ab3] transition-colors">{t("programs.jepang")}</a></li>
              <li><a href="#program" className="text-sm text-slate-500 hover:text-[#007ab3] transition-colors">{t("programs.korea")}</a></li>
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">{t("footer.kontak")}</h4>
            <div className="space-y-3">
              <a href="tel:+6281234567890" className="flex items-start gap-3 text-sm text-slate-500 hover:text-[#007ab3] transition-colors">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </a>
              <a href="mailto:info@lpkbojonegoromendunia.com" className="flex items-start gap-3 text-sm text-slate-500 hover:text-[#007ab3] transition-colors">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@lpkbojonegoromendunia.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>QWMH+6MP, Jl. Madrasah, RT.03/RW.05, Gempol, Sidodadi, Kec. Sukosewu, Kabupaten Bojonegoro, Jawa Timur 62183</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="border-t border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} LPK Bojonegoro Mendunia. {t("footer.copyright")}
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-[#007ab3] text-xs transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-slate-400 hover:text-[#007ab3] text-xs transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
