"use client";
import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/utils/LanguageProvider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(
      `Halo LPK Bojonegoro Mendunia!\n\nNama: ${name}\nNo. HP: ${phone}\nProgram: ${program || "-"}\nPesan: ${message}`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, "_blank");
  }

  return (
    <motion.section
      id="kontak"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-14">
          <p className="text-[#007ab3] font-semibold text-xs uppercase tracking-widest mb-3">
            {t("contact.title")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            {t("contact.subtitle")}
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            {t("contact.desc")}
          </p>
        </motion.div>
        <motion.div variants={container} className="grid lg:grid-cols-2 gap-8">
          <motion.div variants={fadeUp} className="border border-slate-200 rounded-md p-7">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-7">
              {t("contact.info")}
            </h3>
            <div className="space-y-6">
              {[
                { icon: Phone, label: t("contact.labelPhone"), href: "tel:+6281234567890", value: "+62 812-3456-7890" },
                { icon: MessageCircle, label: t("contact.labelWA"), href: "https://wa.me/6281234567890", value: "+62 812-3456-7890" },
                { icon: Mail, label: t("contact.labelEmail"), href: "mailto:info@lpkbojonegoromendunia.com", value: "info@lpkbojonegoromendunia.com" },
                { icon: MapPin, label: t("contact.labelAddress"), href: null as string | null, value: "Jl. Madrasah, RT.03/RW.05, Gempol, Sidodadi, Kec. Sukosewu, Kabupaten Bojonegoro" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#007ab3]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#007ab3]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-slate-700 text-sm leading-snug hover:text-[#007ab3] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-slate-700 text-sm leading-snug">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="border border-slate-200 rounded-md p-7">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-7">
              {t("contact.formTitle")}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {t("contact.nama")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={t("contact.placeholderNama")}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {t("contact.wa")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder={t("contact.placeholderWA")}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  {t("contact.program")}
                </label>
                <select
                  value={program}
                  onChange={e => setProgram(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] transition-all bg-white"
                >
                  <option value="">{t("contact.pilihProgram")}</option>
                  <option value="gakkou">Program Gakkou</option>
                  <option value="tokutei">Program Tokutei Ginou</option>
                  <option value="care">Program Care Worker</option>
                  <option value="hospitality">Program Hospitality</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  {t("contact.pesan")}
                </label>
                <textarea
                  rows={4}
                  placeholder={t("contact.placeholderPesan")}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#007ab3] hover:bg-[#00608e] text-white font-bold text-sm rounded-md transition-all active:scale-95"
              >
                {t("contact.submit")}
              </button>
            </form>
          </motion.div>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-8 rounded-md overflow-hidden border border-slate-200">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#007ab3]" />
            <span className="text-sm font-bold text-slate-700">{t("contact.map")}</span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.209668683041!2d111.92662017577615!3d-7.216908370862182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77810030b63549%3A0x58f60ffc91846d6c!2sLPK%20Bojonegoro%20Mendunia!5e0!3m2!1sid!2sid!4v1779347503986!5m2!1sid!2sid"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
