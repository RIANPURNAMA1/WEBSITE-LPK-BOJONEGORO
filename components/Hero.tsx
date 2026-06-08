"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Plane, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useRegister } from "@/components/RegisterModal";
import { useTranslation } from "@/utils/LanguageProvider";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  const { open } = useRegister();
  const { t } = useTranslation();
  const [heroData, setHeroData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setHeroData(data);
      })
      .catch(() => {});
  }, []);

  const hd = heroData ?? {};
  const badgeDaftar = hd.badgeDaftar || t("hero.badgeDaftar");
  const badgeMulai = hd.badgeMulai || t("hero.badgeMulai");
  const heading1 = hd.heading1 || t("hero.heading1");
  const heading2 = hd.heading2 || t("hero.heading2");
  const desc = hd.description || t("hero.desc");
  const btnMulai = hd.btnMulai || t("hero.btnMulai");
  const btnKonsultasi = hd.btnKonsultasi || t("hero.btnKonsultasi");

  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1, transition: { duration: 8, ease: "easeOut" } }}
        style={{
          backgroundImage: "url(https://i.pinimg.com/1200x/f1/42/a2/f142a268065627279cd2649035145409.jpg)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95 hero-overlay" />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-screen-xl mx-auto text-center flex flex-col items-center"
      >
        <motion.a
          variants={fadeUp}
          href="#pendaftaran"
          className="inline-flex items-center py-1 px-1 pr-3 md:pr-4 mb-6 md:mb-8 text-xs md:text-sm text-slate-700 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          role="alert"
        >
          <span className="text-[10px] md:text-xs font-bold bg-[#007ab3] rounded-full text-white px-3 md:px-4 py-1 md:py-1.5 mr-2 md:mr-3 flex items-center gap-1 whitespace-nowrap">
            <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" /> {badgeDaftar}
          </span>
          <span className="text-xs md:text-sm font-medium whitespace-nowrap">{badgeMulai}</span>
          <Plane className="ml-1.5 md:ml-2 w-3 h-3 md:w-4 md:h-4 text-slate-400 flex-shrink-0" />
        </motion.a>
        <motion.h1
          variants={fadeScale}
          className="mb-4 md:mb-6 text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight md:leading-snug text-slate-900 max-w-4xl"
        >
          {heading1} <br className="hidden md:block" />
          <span className="text-[#007ab3]">{heading2}</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mb-8 md:mb-10 text-lg sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed"
        >
          {desc}
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center"
        >
          <button
            onClick={open}
            className="inline-flex justify-center items-center py-4 md:py-4 px-8 md:px-10 text-lg md:text-lg font-semibold text-white rounded-lg bg-[#007ab3] hover:bg-[#00608e] transition-all shadow-sm cursor-pointer"
          >
            {btnMulai}
            <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
          </button>
          <a
            href="#konsultasi"
            className="inline-flex justify-center items-center py-4 md:py-4 px-8 md:px-10 text-lg md:text-lg font-semibold text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-100 bg-white transition-all"
          >
            <Sparkles className="mr-2 -ml-1 w-5 h-5 text-slate-400" />
            {btnKonsultasi}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
