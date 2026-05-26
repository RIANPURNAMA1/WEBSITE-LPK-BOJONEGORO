"use client";
import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import ProgramDetail from "@/components/ProgramDetail";
import Image from "next/image";
import { useTranslation } from "@/utils/LanguageProvider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function getPrograms(t: (key: string) => string) {
  return [
    {
      idx: 0,
      image: "/class-japan.png",
      title: t("programs.jepang"),
      desc: t("programs.jepangDesc"),
      cocok: t("programs.jepangCocok"),
      features: [
        t("programs.jepangFitur1"),
        t("programs.jepangFitur2"),
        t("programs.jepangFitur3"),
        t("programs.jepangFitur4"),
        t("programs.jepangFitur5"),
      ],
    },
    {
      idx: 1,
      image: "/class-korea.png",
      title: t("programs.korea"),
      desc: t("programs.koreaDesc"),
      cocok: t("programs.koreaCocok"),
      features: [
        t("programs.koreaFitur1"),
        t("programs.koreaFitur2"),
        t("programs.koreaFitur3"),
        t("programs.koreaFitur4"),
        t("programs.koreaFitur5"),
      ],
    },
  ];
}

export default function Programs() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const programsData = getPrograms(t);
  return (
    <motion.section
      id="program"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <p className="text-[#007ab3] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {t("programs.title")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t("programs.subtitle")}
          </h2>
        </motion.div>
        <motion.div variants={container} className="grid md:grid-cols-2 gap-4">
          {programsData.map((program) => (
            <motion.div
              key={program.idx}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group w-full"
            >
              <div className="relative w-[200px] h-[200px] rounded-xl overflow-hidden mb-5 mx-auto">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {program.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {program.desc}
              </p>
              <p className="text-slate-600 text-sm font-medium mb-5">
                {program.cocok}
              </p>
              <div className="space-y-3 mb-8">
                {program.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-[#007ab3] shrink-0 mt-0.5" />
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelected(program.idx)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#007ab3] hover:bg-[#00608e] text-white font-semibold text-sm rounded-lg transition-all active:scale-95 cursor-pointer"
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
