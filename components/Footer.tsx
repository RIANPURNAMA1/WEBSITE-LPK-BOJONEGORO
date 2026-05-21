"use client";
import { GraduationCap, Share2, Camera, PlayCircle, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/utils/i18n";

const quickLinks = [
  { label: "footer.menu.links.0", href: "#tentang" },
  { label: "footer.menu.links.1", href: "#program" },
  { label: "footer.menu.links.2", href: "#galeri" },
  { label: "footer.menu.links.3", href: "#fasilitas" },
  { label: "footer.menu.links.4", href: "#testimoni" },
  { label: "footer.menu.links.5", href: "#faq" },
];

const programs = [
  { label: "footer.programs.links.0", href: "#program" },
  { label: "footer.programs.links.1", href: "#program" },
  { label: "footer.programs.links.2", href: "#program" },
  { label: "footer.programs.links.3", href: "#program" },
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
  const t = useTranslation();
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
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-md bg-[#007ab3] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm text-slate-900">{t("footer.brand.title")}</div>
                <div className="text-xs text-slate-500 font-medium">{t("footer.brand.subtitle")}</div>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              {t("footer.brand.description")}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: "#", label: "Facebook" },
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: PlayCircle, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-md border border-slate-200 text-slate-400 flex items-center justify-center hover:border-[#007ab3] hover:text-[#007ab3] hover:bg-[#007ab3]/5 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">{t("footer.menu.title")}</h4>
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
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">{t("footer.programs.title")}</h4>
            <ul className="space-y-2.5">
              {programs.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-slate-500 hover:text-[#007ab3] transition-colors">
                    {t(label)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">{t("footer.contact.title")}</h4>
            <div className="space-y-3">
              <a href="tel:+6281234567890" className="flex items-start gap-3 text-sm text-slate-500 hover:text-[#007ab3] transition-colors">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t("footer.contact.phone")}</span>
              </a>
              <a href="mailto:info@lpkbojonegoromendunia.com" className="flex items-start gap-3 text-sm text-slate-500 hover:text-[#007ab3] transition-colors">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t("footer.contact.email")}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t("footer.contact.address")}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="border-t border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} {t("footer.bottom.copyright")}
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-[#007ab3] text-xs transition-colors">
              {t("footer.bottom.privacy")}
            </a>
            <a href="#" className="text-slate-400 hover:text-[#007ab3] text-xs transition-colors">
              {t("footer.bottom.terms")}
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
