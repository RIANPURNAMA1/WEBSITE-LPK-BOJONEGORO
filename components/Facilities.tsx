"use client";
import { Monitor, BookOpen, Dumbbell, Bed, Wifi, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/utils/LanguageProvider";

function getFacilities(t: (key: string) => string) {
  return [
    { icon: Monitor, title: t("facilities.ruangKelas"), desc: t("facilities.ruangKelasDesc") },
    { icon: BookOpen, title: t("facilities.labBahasa"), desc: t("facilities.labBahasaDesc") },
    { icon: Dumbbell, title: t("facilities.perpus"), desc: t("facilities.perpusDesc") },
    { icon: Bed, title: t("facilities.asrama"), desc: t("facilities.asramaDesc") },
    { icon: Wifi, title: t("facilities.kantin"), desc: t("facilities.kantinDesc") },
    { icon: GraduationCap, title: t("facilities.aula"), desc: t("facilities.aulaDesc") },
  ];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Facilities() {
  const { t } = useTranslation();
  const facilities = getFacilities(t);
  return (
    <motion.section
      id="fasilitas"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <p className="text-[#007ab3] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {t("facilities.title")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t("facilities.subtitle")}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base px-2">
            {t("facilities.desc")}
          </p>
        </motion.div>
        <motion.div variants={container} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="bg-white rounded-md p-8 border border-slate-200 hover:border-[#007ab3]/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-md bg-[#007ab3]/10 text-[#007ab3] flex items-center justify-center mb-6 group-hover:bg-[#007ab3] group-hover:text-white transition-colors duration-300">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3 group-hover:text-[#007ab3] transition-colors">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
