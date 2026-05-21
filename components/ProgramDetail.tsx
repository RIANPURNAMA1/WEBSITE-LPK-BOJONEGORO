"use client";
import { X, Clock, CheckCircle2, Send } from "lucide-react";
import { useTranslation } from "@/utils/i18n";
import { useRegister } from "@/components/RegisterModal";

export default function ProgramDetail({
  idx,
  onClose,
}: {
  idx: number;
  onClose: () => void;
}) {
  const t = useTranslation();
  const { open: openRegister } = useRegister();

  const handleDaftar = () => {
    onClose();
    openRegister();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">{t(`programs.list.${idx}.title`)}</h2>
            <button onClick={onClose} className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="px-6 py-5 space-y-5">
          <p className="text-slate-600 text-sm leading-relaxed">
            {t(`programs.list.${idx}.desc`)}
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-slate-50 rounded-md px-4 py-3">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-500">{t("programs.details.duration")}:</span>
              <span>{t(`programs.list.${idx}.duration`)}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-slate-50 rounded-md px-4 py-3">
              <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-500">{t("programs.details.category")}:</span>
              <span>{t(`programs.list.${idx}.category`)}</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
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
            onClick={handleDaftar}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#007ab3] hover:bg-[#00608e] text-white font-bold text-sm rounded-md transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            {t("navbar.daftarSekarang")}
          </button>
        </div>
      </div>
    </div>
  );
}
