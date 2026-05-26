"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { X, Send } from "lucide-react";
import { useTranslation } from "@/utils/LanguageProvider";

type RegisterContextType = {
  open: () => void;
  close: () => void;
};

const RegisterContext = createContext<RegisterContextType | null>(null);

export function useRegister() {
  const ctx = useContext(RegisterContext);
  if (!ctx) throw new Error("useRegister must be used within RegisterProvider");
  return ctx;
}

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <RegisterContext.Provider value={{ open, close }}>
      {children}
      {isOpen && <RegisterModal onClose={close} />}
    </RegisterContext.Provider>
  );
}

const programKeys = [
  { id: "gakkou", key: "register.programGakkou" },
  { id: "tokutei", key: "register.programTokutei" },
  { id: "care", key: "register.programCare" },
  { id: "hospitality", key: "register.programHospitality" },
];

function RegisterModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", wa: "", program: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo LPK Bojonegoro Mendunia, saya ingin mendaftar.%0A%0ANama: ${encodeURIComponent(form.name)}%0ANo. WhatsApp: ${encodeURIComponent(form.wa)}%0AProgram: ${encodeURIComponent(form.program || "-")}%0APesan: ${encodeURIComponent(form.message || "-")}`;
    window.open(`https://wa.me/6281234567890?text=${text}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">{t("register.title")}</h2>
            <button onClick={onClose} className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{t("register.desc")}</p>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              {t("contact.nama")} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder={t("contact.placeholderNama")}
              className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              {t("contact.wa")} <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="wa"
              value={form.wa}
              onChange={handleChange}
              required
              placeholder={t("contact.placeholderWA")}
              className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] transition-all"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              {t("contact.program")}
            </label>
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] transition-all bg-white"
            >
              <option value="">{t("contact.pilihProgram")}</option>
              {programKeys.map((p) => (
                <option key={p.id} value={t(p.key)}>{t(p.key)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              {t("contact.pesan")}
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder={t("contact.placeholderPesan")}
              className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#007ab3] hover:bg-[#00608e] text-white font-bold text-sm rounded-md transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            {t("register.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
