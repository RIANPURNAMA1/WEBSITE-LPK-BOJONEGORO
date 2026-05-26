"use client";
import { useState, useEffect, useCallback } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/utils/LanguageProvider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function getPhotos(t: (key: string) => string) {
  return [
    { span: "col-span-2 row-span-2", idx: 0, image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop", label: t("gallery.photo1") },
    { span: "col-span-1 row-span-1", idx: 1, image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop", label: t("gallery.photo2") },
    { span: "col-span-1 row-span-1", idx: 2, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop", label: t("gallery.photo3") },
    { span: "col-span-1 row-span-1", idx: 3, image: "https://img.freepik.com/foto-gratis/tangan-alumni-render-3d-melemparkan-topi-kelulusan-ke-udara_107791-16565.jpg?semt=ais_hybrid&w=740&q=80", label: t("gallery.photo4") },
    { span: "col-span-1 row-span-1", idx: 4, image: "https://www.quipper.com/id/blog/wp-content/uploads/2023/02/software-developer-coding-firewall-server-computer-laptop-using-encryption-system-script-security-network-programming-binary-code-data-hacking-application-text-software-1-1.jpg", label: t("gallery.photo5") },
    { span: "col-span-2 row-span-1", idx: 5, image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop", label: t("gallery.photo6") },
  ];
}

export default function Gallery() {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const photos = getPhotos(t);

  const prev = useCallback(() => {
    setLightbox((p) => (p !== null ? (p - 1 + photos.length) % photos.length : null));
  }, []);

  const next = useCallback(() => {
    setLightbox((p) => (p !== null ? (p + 1) % photos.length : null));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  return (
    <motion.section
      id="galeri"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="py-16 md:py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t("gallery.title")}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base px-2">
            {t("gallery.desc")}
          </p>
        </motion.div>
        <motion.div variants={container} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[200px]">
          {photos.map(({ span, idx, image, label }) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              onClick={() => setLightbox(idx)}
              className={`relative ${span} rounded-md overflow-hidden group cursor-pointer bg-slate-200 shadow-sm`}
            >
              <img
                src={image}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Maximize2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <p className="font-bold text-sm md:text-base text-white text-center drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={photos[lightbox].image}
              alt={photos[lightbox].label}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-1.5 rounded-full">
              {photos[lightbox].label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
