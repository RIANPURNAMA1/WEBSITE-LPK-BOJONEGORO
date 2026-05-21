"use client";
import { useState } from "react";
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Users,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/utils/i18n";
import ProgramDetail from "@/components/ProgramDetail";

const programKeys = [
  { icon: GraduationCap, categoryIcon: Building, idx: 0 },
  { icon: Briefcase, categoryIcon: Briefcase, idx: 1 },
  { icon: Users, categoryIcon: Building, idx: 2 },
  { icon: Building, categoryIcon: Building, idx: 3 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Programs() {
  const t = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <motion.section
      id="program"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t("programs.header.title")}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base px-2">
            {t("programs.header.subtitle")}
          </p>
        </motion.div>
        <motion.div variants={container} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programKeys.map(({ icon: Icon, categoryIcon: CategoryIcon, idx }) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-white rounded-sm p-6 border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#007ab3]/10 text-[#007ab3] flex items-center justify-center mb-5 group-hover:bg-[#007ab3] group-hover:text-white transition-colors duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug">
                {t(`programs.list.${idx}.title`)}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {t(`programs.list.${idx}.desc`)}
              </p>
              <div className="space-y-2.5 mb-5 flex-1">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{t(`programs.list.${idx}.duration`)}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CategoryIcon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{t(`programs.list.${idx}.category`)}</span>
                </div>
              </div>
              <div className="mt-auto pt-5 border-t border-slate-100 mb-6">
                <p className="text-[13px] font-semibold text-slate-900 mb-3">{t("programs.details.persyaratan")}</p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-tight">{t(`programs.list.${idx}.usia`)}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-tight">{t(`programs.list.${idx}.pendidikan`)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelected(idx)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#007ab3] hover:text-[#00608e] group-hover:gap-2.5 transition-all cursor-pointer"
              >
                {t("programs.cta")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {selected !== null && (
        <ProgramDetail idx={selected} onClose={() => setSelected(null)} />
      )}
    </motion.section>
  );
}
