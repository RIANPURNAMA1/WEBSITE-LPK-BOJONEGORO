"use client";
import React from "react";

type Props = {
  active: string;
  setActive: (s: string) => void;
};

const items: { id: string; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "Tentang" },
  { id: "programs", label: "Program" },
  { id: "contact", label: "Kontak" },
  { id: "settings", label: "Pengaturan" },
];

export default function AdminSidebar({ active, setActive }: Props) {
  return (
    <aside className="bg-white rounded-2xl p-4 shadow-sm h-full">
      <div className="px-2 py-3 border-b border-slate-100 mb-3">
        <h3 className="text-sm font-semibold text-slate-700">Admin</h3>
        <p className="text-xs text-slate-400">Kontrol konten situs</p>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className={`text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
              active === it.id
                ? "bg-[#007ab3]/8 text-[#007ab3]"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
