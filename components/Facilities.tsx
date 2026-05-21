"use client";
import { Monitor, BookOpen, Dumbbell, Bed, Wifi, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/utils/i18n";

const facilityKeys = [
  { icon: Monitor, idx: 0 },
  { icon: BookOpen, idx: 1 },
  { icon: Dumbbell, idx: 2 },
  { icon: Bed, idx: 3 },
  { icon: Wifi, idx: 4 },
  { icon: GraduationCap, idx: 5 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Facilities() {
  const t = useTranslation();
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
            {t("facilities.header.title")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t("facilities.header.subtitle")}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base px-2">
            {t("facilities.header.description")}
          </p>
        </motion.div>
        <motion.div variants={container} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilityKeys.map(({ icon: Icon, idx }) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-white rounded-md p-8 border border-slate-200 hover:border-[#007ab3]/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-md bg-[#007ab3]/10 text-[#007ab3] flex items-center justify-center mb-6 group-hover:bg-[#007ab3] group-hover:text-white transition-colors duration-300">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3 group-hover:text-[#007ab3] transition-colors">
                {t(`facilities.list.${idx}.title`)}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t(`facilities.list.${idx}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
