"use client";
import { X, CheckCircle2, Send } from "lucide-react";
import { useRegister } from "@/components/RegisterModal";
import { useTranslation } from "@/utils/LanguageProvider";

function getPrograms(t: (key: string) => string) {
  return [
    {
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

export default function ProgramDetail({
  idx,
  onClose,
}: {
  idx: number;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { open: openRegister } = useRegister();
  const program = getPrograms(t)[idx];

  const handleDaftar = () => {
    onClose();
    openRegister();
  };

  if (!program) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">{program.title}</h2>
            <button onClick={onClose} className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="px-6 py-5 space-y-5">
          <p className="text-slate-600 text-sm leading-relaxed">
            {program.desc}
          </p>

          <p className="text-slate-700 text-sm font-medium">
            {program.cocok}
          </p>

          <div className="border-t border-slate-100 pt-5">
            <p className="text-[13px] font-semibold text-slate-900 mb-3">{t("programs.fiturProgram")}</p>
            <div className="space-y-3">
              {program.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#007ab3] shrink-0 mt-0.5" />
                  <span className="leading-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleDaftar}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#007ab3] hover:bg-[#00608e] text-white font-bold text-sm rounded-md transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            {t("register.title")}
          </button>
        </div>
      </div>
    </div>
  );
}
