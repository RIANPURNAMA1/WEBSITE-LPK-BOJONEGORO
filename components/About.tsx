"use client";
import { UserCheck, Wrench, BookOpen, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/utils/i18n";

const keunggulanKeys = [
  { icon: UserCheck, key: "instrukturPengalaman" },
  { icon: BookOpen, key: "fasilitasLengkap" },
  { icon: Wrench, key: "programTerstruktur" },
  { icon: HeartHandshake, key: "bimbinganIntensif" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function About() {
  const t = useTranslation();
  return (
    <motion.section
      id="tentang"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <p className="text-[#007ab3] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {t("about.header.siapaKami")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t("about.header.tentangKami")}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base px-2">
            {t("about.description.0")}
          </p>
        </motion.div>
        <motion.div variants={container} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div variants={fadeUp} className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              LPK Bojonegoro Mendunia
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">
              {t("about.description.1")}
            </p>
            <p className="text-slate-600 leading-relaxed mb-8 text-sm sm:text-base">
              {t("about.description.2")}
            </p>
            <motion.div variants={container} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { num: "500+", labelKey: "about.stats.alumniBerangkat" },
                { num: "10+", labelKey: "about.stats.tahunPengalaman" },
                { num: "50+", labelKey: "about.stats.mitraPerusahaan" },
              ].map(({ num, labelKey }) => (
                <motion.div
                  key={labelKey}
                  variants={scaleIn}
                  className="bg-[#007ab3]/5 border border-[#007ab3]/10 rounded-md px-4 py-5 text-center flex flex-col justify-center transition-all hover:bg-[#007ab3]/10"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#007ab3] mb-1">{num}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">{t(labelKey)}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold text-slate-900 mb-6 hidden lg:block">
              {t("about.keunggulan.title")}
            </h3>
            <motion.div variants={container} className="grid sm:grid-cols-2 gap-4">
              {keunggulanKeys.map(({ icon: Icon, key }) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className="bg-slate-50 border border-slate-100 rounded-md p-5 md:p-6 hover:bg-white hover:border-[#007ab3]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#007ab3]/10 flex items-center justify-center mb-4 group-hover:bg-[#007ab3] group-hover:shadow-md transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#007ab3] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2 group-hover:text-[#007ab3] transition-colors">
                    {t(`about.keunggulan.${key}.title`)}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t(`about.keunggulan.${key}.desc`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
