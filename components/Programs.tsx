"use client";
import { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
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

export default function Programs() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const [programData, setProgramData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetch("/api/programs")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setProgramData(data);
      })
      .catch(() => {});
  }, []);

  const pd = programData ?? {};
  const title = pd.title || t("programs.title");
  const subtitle = pd.subtitle || t("programs.subtitle");
  const cta = pd.cta || t("programs.cta");
  const cards: any[] = pd.cards || [];

  return (
    <motion.section
      id="program"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <p className="text-[#007ab3] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {title}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {subtitle}
          </h2>
        </motion.div>
        <motion.div variants={container} className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cards.map((program: any, idx: number) => (
            <motion.div
              key={program.id || idx}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group w-full"
            >
              <div className="relative w-[200px] h-[200px] rounded-xl overflow-hidden mb-5 mx-auto">
                <Image
                  src={program.image || "/globe.svg"}
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
                {(program.features || []).map((feature: string, i: number) => (
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
                {cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {selected !== null && (
        <ProgramDetail
          program={cards[selected]}
          onClose={() => setSelected(null)}
        />
      )}
    </motion.section>
  );
}
