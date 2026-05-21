"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/utils/i18n";

const faqCount = 6;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function FAQ() {
  const t = useTranslation();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="py-24 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-[#007ab3] font-semibold text-sm uppercase tracking-widest mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            {t("faq.header.title")}
          </h2>
          <p className="text-gray-500">
            {t("faq.header.subtitle")}
          </p>
        </motion.div>
        <motion.div variants={container} className="space-y-3">
          {Array.from({ length: faqCount }).map((_, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-md overflow-hidden border border-gray-100"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">
                  {t(`faq.questions.${i}.q`)}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">{t(`faq.questions.${i}.a`)}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
