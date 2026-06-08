"use client";
import { useState, useEffect } from "react";
import { Wallet, GraduationCap, BookOpen, Users, ShieldCheck, HandCoins, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/utils/LanguageProvider";

const keunggulanKeys = [
  { icon: Wallet, key: "terjangkau" },
  { icon: GraduationCap, key: "kurikulum" },
  { icon: BookOpen, key: "bukuPanduan" },
  { icon: Users, key: "jaringan" },
  { icon: ShieldCheck, key: "garansi" },
  { icon: HandCoins, key: "danaTalang" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
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
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [aboutData, setAboutData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setAboutData(data);
      })
      .catch(() => {});
  }, []);

  const ad = aboutData ?? {};
  const siapaKami = ad.siapaKami || t("about.siapaKami");
  const tentangKami = ad.tentangKami || t("about.tentangKami");
  const desc1 = ad.desc1 || t("about.desc1");
  const desc2 = ad.desc2 || t("about.desc2");
  const stats1Num = ad.stats1Num || "500+";
  const stats1Label = ad.stats1Label || t("about.stats1");
  const stats2Num = ad.stats2Num || "10+";
  const stats2Label = ad.stats2Label || t("about.stats2");
  const stats3Num = ad.stats3Num || "50+";
  const stats3Label = ad.stats3Label || t("about.stats3");
  const keunggulanBadge = ad.keunggulanBadge || t("about.keunggulan");
  const keunggulanTitle = ad.keunggulanTitle || t("about.keunggulanTitle");
  const cards = ad.keunggulanCards as { key: string; title: string; desc: string }[] | undefined;

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="tentang" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#007ab3] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {siapaKami}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {tentangKami}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base px-2">
            {desc1}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16 lg:mb-24"
        >
          <motion.div variants={fadeUp} className="lg:w-1/2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              LPK Bojonegoro Mendunia
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
              {desc2}
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="lg:w-1/2">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {[
                { num: stats1Num, label: stats1Label },
                { num: stats2Num, label: stats2Label },
                { num: stats3Num, label: stats3Label },
              ].map(({ num, label }) => (
                <motion.div
                  key={label}
                  variants={scaleIn}
                  className="bg-gradient-to-br from-[#007ab3]/5 to-[#007ab3]/10 border border-[#007ab3]/10 rounded-xl px-3 py-5 sm:py-6 text-center flex flex-col items-center justify-center transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#007ab3] mb-1">{num}</div>
                  <div className="text-[11px] sm:text-sm text-slate-600 font-medium leading-tight">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-[#007ab3] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            {keunggulanBadge}
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {keunggulanTitle}
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {keunggulanKeys.map(({ icon: Icon, key }) => {
            const isExpanded = expanded[key];
            const card = cards?.find((c: any) => c.key === key);
            const title = card?.title || t(`about.keunggulan.${key}.title`);
            const desc = card?.desc || t(`about.keunggulan.${key}.desc`);
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="relative bg-white border border-slate-200 rounded-xl p-6 md:p-7 hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#007ab3]/10 flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#007ab3] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#007ab3] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">
                    {title}
                  </h4>
                  <div className="text-slate-500 text-sm leading-relaxed">
                    <span className={isExpanded ? "" : "line-clamp-2"}>
                      {desc}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleExpand(key)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#007ab3] hover:text-[#00608e] transition-colors cursor-pointer relative z-20"
                  >
                    {isExpanded ? (
                      <>{t("about.lebihSedikit")} <ChevronUp className="w-3.5 h-3.5" /></>
                    ) : (
                      <>{t("about.selengkapnya")} <ChevronDown className="w-3.5 h-3.5" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
