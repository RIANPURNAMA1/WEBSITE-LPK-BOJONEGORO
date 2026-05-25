"use client";
import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Globe,
  Flag,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/utils/i18n";
import ProgramDetail from "@/components/ProgramDetail";

const programKeys = [
  { icon: Globe, idx: 0 },
  { icon: Flag, idx: 1 },
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
          <p className="text-[#007ab3] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {t("programs.header.title")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t("programs.header.subtitle")}
          </h2>
        </motion.div>
        <motion.div variants={container} className="grid md:grid-cols-2 gap-8">
          {programKeys.map(({ icon: Icon, idx }) => {
            const features: string[] = t.raw(`programs.list.${idx}.features`) as string[];
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#007ab3]/10 flex items-center justify-center mb-6 group-hover:bg-[#007ab3] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#007ab3] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {t(`programs.list.${idx}.title`)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {t(`programs.list.${idx}.desc`)}
                </p>
                <p className="text-slate-600 text-sm font-medium mb-5">
                  {t(`programs.list.${idx}.cocok`)}
                </p>
                <div className="space-y-3 mb-8">
                  {features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#007ab3] shrink-0 mt-0.5" />
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelected(idx)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#007ab3] hover:bg-[#00608e] text-white font-semibold text-sm rounded-lg transition-all active:scale-95 cursor-pointer"
                >
                  {t("programs.cta")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {selected !== null && (
        <ProgramDetail idx={selected} onClose={() => setSelected(null)} />
      )}
    </motion.section>
  );
}
