"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "@/utils/i18n";

interface Testimonial {
  name: string;
  program: string;
  location: string;
  text: string;
  stars: number;
}

const avatars = [
  "https://i.pravatar.cc/150?img=47",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=32",
  "https://i.pravatar.cc/150?img=53",
  "https://i.pravatar.cc/150?img=44",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function TestiCard({ item, avatar }: { item: Testimonial; avatar: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5 mb-4 flex-shrink-0">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: item.stars }).map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
        &ldquo;{item.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white shadow-sm">
          <img
            src={avatar}
            alt={item.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-bold text-gray-900 text-sm">{item.name}</div>
          <div className="text-xs text-gray-500">{item.program}</div>
          <div className="text-xs text-blue-500">{item.location}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeColumn({
  items,
  avatars: avatarList,
  direction,
  duration,
}: {
  items: Testimonial[];
  avatars: string[];
  direction: "up" | "down";
  duration: number;
}) {
  const doubled = [...items, ...items];
  const doubleAvatars = [...avatars, ...avatars];
  const animClass =
    direction === "up" ? "animate-marquee-up" : "animate-marquee-down";

  return (
    <div className="flex-1 overflow-hidden relative h-[520px]">
      <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      <div className={animClass} style={{ animationDuration: `${duration}s` }}>
        {doubled.map((t, i) => (
          <TestiCard key={i} item={t} avatar={doubleAvatars[i]} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const tr = useTranslation();
  const testimonials: Testimonial[] = tr.raw("testimonials.list") || [];

  if (testimonials.length === 0) return null;

  const a = avatars.slice(0, testimonials.length);

  const cols = [
    { items: testimonials.slice(0, 5), avatars: a.slice(0, 5), direction: "up" as const, duration: 25 },
    { items: [...testimonials.slice(2, 5), ...testimonials.slice(0, 2)], avatars: [...a.slice(2, 5), ...a.slice(0, 2)], direction: "down" as const, duration: 20 },
    { items: [...testimonials.slice(4, 5), ...testimonials.slice(0, 4)], avatars: [...a.slice(4, 5), ...a.slice(0, 4)], direction: "up" as const, duration: 28 },
  ];

  return (
    <motion.section
      id="testimoni"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-[#007ab3] font-semibold text-sm uppercase tracking-widest mb-2">
            {tr("testimonials.header.title")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            {tr("testimonials.header.subtitle")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {tr("testimonials.header.description")}
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="hidden lg:flex gap-6">
          {cols.map((col, i) => (
            <MarqueeColumn key={i} {...col} />
          ))}
        </motion.div>
        <motion.div variants={fadeUp} className="lg:hidden flex gap-4">
          <MarqueeColumn items={testimonials} avatars={a} direction="up" duration={20} />
        </motion.div>
      </div>
    </motion.section>
  );
}
