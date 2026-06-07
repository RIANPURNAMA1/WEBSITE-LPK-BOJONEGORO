"use client";
import { useState, useEffect } from "react";
import { Save, Eye, RotateCcw, LayoutDashboard, BookOpen, PenSquare, Image, Phone, LogOut, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "hero", label: "Hero Section", icon: PenSquare },
  { id: "about", label: "Tentang", icon: BookOpen },
  { id: "programs", label: "Program", icon: Image },
  { id: "contact", label: "Kontak", icon: Phone },
];

type HeroData = {
  badgeDaftar: string;
  badgeMulai: string;
  heading1: string;
  heading2: string;
  description: string;
  btnMulai: string;
  btnKonsultasi: string;
};

const defaultHero: HeroData = {
  badgeDaftar: "Daftar Sekarang",
  badgeMulai: "Mulai Perjalananmu",
  heading1: "Peluang Kerja Mendunia di",
  heading2: "Jepang dan Korea",
  description: "Kami bersamai sampai kamu bisa sukses kerja mendunia ke Jepang dan Korea Selatan.",
  btnMulai: "Mulai Perjalananmu",
  btnKonsultasi: "Konsultasi Gratis",
};

function HeroEditor() {
  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setHero(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });
      if (res.ok) {
        setMsg("Berhasil disimpan!");
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg("Gagal menyimpan");
      }
    } catch {
      setMsg("Error koneksi");
    }
    setSaving(false);
  }

  function handleReset() {
    setHero(defaultHero);
  }

  if (loading) return <div className="text-sm text-slate-400 py-8 text-center">Memuat...</div>;

  const fields: { key: keyof HeroData; label: string; type: string }[] = [
    { key: "badgeDaftar", label: "Badge — Daftar Sekarang", type: "text" },
    { key: "badgeMulai", label: "Badge — Mulai Perjalananmu", type: "text" },
    { key: "heading1", label: "Heading Baris 1", type: "text" },
    { key: "heading2", label: "Heading Baris 2 (warna biru)", type: "text" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "btnMulai", label: "Tombol — Mulai Perjalananmu", type: "text" },
    { key: "btnKonsultasi", label: "Tombol — Konsultasi Gratis", type: "text" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Hero Section</h2>
          <p className="text-sm text-slate-400 mt-0.5">Kelola teks pada hero section beranda</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#007ab3] hover:bg-[#00608e] text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" /> {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      {msg && (
        <div className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
          msg === "Berhasil disimpan!" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
        }`}>
          {msg}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">{label}</label>
            {type === "textarea" ? (
              <textarea
                value={hero[key]}
                onChange={(e) => setHero({ ...hero, [key]: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] resize-none"
              />
            ) : (
              <input
                type="text"
                value={hero[key]}
                onChange={(e) => setHero({ ...hero, [key]: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

type AboutData = {
  siapaKami: string;
  tentangKami: string;
  desc1: string;
  desc2: string;
  aboutImage: string;
  stats1Num: string;
  stats1Label: string;
  stats2Num: string;
  stats2Label: string;
  stats3Num: string;
  stats3Label: string;
  keunggulanBadge: string;
  keunggulanTitle: string;
  keunggulanCards: { key: string; title: string; desc: string }[];
};

const defaultAbout: AboutData = {
  siapaKami: "Siapa Kami",
  tentangKami: "Tentang Kami",
  desc1: "",
  desc2: "",
  aboutImage: "",
  stats1Num: "500+",
  stats1Label: "Alumni Berangkat",
  stats2Num: "10+",
  stats2Label: "Tahun Pengalaman",
  stats3Num: "50+",
  stats3Label: "Mitra Perusahaan",
  keunggulanBadge: "Keunggulan",
  keunggulanTitle: "Kenapa harus ikut Kelas di Mendunia.id?",
  keunggulanCards: [
    { key: "terjangkau", title: "Biaya Terjangkau", desc: "" },
    { key: "kurikulum", title: "Kurikulum Terstruktur", desc: "" },
    { key: "bukuPanduan", title: "Buku Panduan Lengkap", desc: "" },
    { key: "jaringan", title: "Jaringan Luas", desc: "" },
    { key: "garansi", title: "Garansi Mengulang", desc: "" },
    { key: "danaTalang", title: "Dana Talangan", desc: "" },
  ],
};

function AboutEditor() {
  const [about, setAbout] = useState<AboutData>(defaultAbout);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setAbout((prev) => ({
            ...prev,
            ...data,
            keunggulanCards: data.keunggulanCards || prev.keunggulanCards,
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });
      if (res.ok) {
        setMsg("Berhasil disimpan!");
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg("Gagal menyimpan");
      }
    } catch {
      setMsg("Error koneksi");
    }
    setSaving(false);
  }

  function handleReset() {
    setAbout(defaultAbout);
  }

  function updateCard(i: number, field: "title" | "desc", val: string) {
    const cards = [...about.keunggulanCards];
    cards[i] = { ...cards[i], [field]: val };
    setAbout({ ...about, keunggulanCards: cards });
  }

  if (loading) return <div className="text-sm text-slate-400 py-8 text-center">Memuat...</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Tentang Kami</h2>
          <p className="text-sm text-slate-400 mt-0.5">Kelola konten section tentang</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 bg-[#007ab3] hover:bg-[#00608e] text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-50 cursor-pointer">
            <Save className="w-3.5 h-3.5" /> {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      {msg && (
        <div className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
          msg === "Berhasil disimpan!" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
        }`}>
          {msg}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Header</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Badge "Siapa Kami"</label>
              <input type="text" value={about.siapaKami} onChange={(e) => setAbout({...about, siapaKami: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Judul "Tentang Kami"</label>
              <input type="text" value={about.tentangKami} onChange={(e) => setAbout({...about, tentangKami: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Deskripsi</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Paragraf 1 (subtitle)</label>
              <textarea value={about.desc1} onChange={(e) => setAbout({...about, desc1: e.target.value})} rows={3} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] resize-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Paragraf 2 (deskripsi utama)</label>
              <textarea value={about.desc2} onChange={(e) => setAbout({...about, desc2: e.target.value})} rows={3} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] resize-none" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Gambar</h3>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Upload Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const form = new FormData();
                form.append("file", file);
                try {
                  const res = await fetch("/api/upload", { method: "POST", body: form });
                  const data = await res.json();
                  if (data.url) setAbout({...about, aboutImage: data.url});
                } catch {}
              }}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#007ab3]/10 file:text-[#007ab3] hover:file:bg-[#007ab3]/20 file:cursor-pointer cursor-pointer"
            />
            {about.aboutImage && (
              <div className="flex items-center gap-3 mt-2">
                <img src={about.aboutImage} alt="Preview" className="w-20 h-16 object-cover rounded-lg border border-slate-200" />
                <button
                  onClick={() => setAbout({...about, aboutImage: ""})}
                  className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            )}
            <p className="text-xs text-slate-400">Kosongkan untuk menggunakan placeholder default</p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Statistik</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3 p-4 bg-slate-50 rounded-lg">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Angka {i}</label>
                  <input type="text" value={i === 1 ? about.stats1Num : i === 2 ? about.stats2Num : about.stats3Num}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (i === 1) setAbout({...about, stats1Num: val});
                      else if (i === 2) setAbout({...about, stats2Num: val});
                      else setAbout({...about, stats3Num: val});
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Label {i}</label>
                  <input type="text" value={i === 1 ? about.stats1Label : i === 2 ? about.stats2Label : about.stats3Label}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (i === 1) setAbout({...about, stats1Label: val});
                      else if (i === 2) setAbout({...about, stats2Label: val});
                      else setAbout({...about, stats3Label: val});
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Keunggulan</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Badge "Keunggulan"</label>
              <input type="text" value={about.keunggulanBadge} onChange={(e) => setAbout({...about, keunggulanBadge: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Judul Keunggulan</label>
              <input type="text" value={about.keunggulanTitle} onChange={(e) => setAbout({...about, keunggulanTitle: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
            </div>
          </div>
          <div className="space-y-4">
            {about.keunggulanCards.map((card, i) => (
              <div key={card.key} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase mb-3">{card.key}</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Judul</label>
                    <input type="text" value={card.title} onChange={(e) => updateCard(i, "title", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Deskripsi</label>
                    <input type="text" value={card.desc} onChange={(e) => updateCard(i, "desc", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgramEditor() {
  const [data, setData] = useState<any>({
    title: "Program mendunia.id",
    subtitle: "Ada Kelas Apa saja?",
    cta: "Info Selengkapnya",
    cards: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/programs")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error) setData(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/programs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMsg("Berhasil disimpan!");
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg("Gagal menyimpan");
      }
    } catch {
      setMsg("Error koneksi");
    }
    setSaving(false);
  }

  function addCard() {
    setData({
      ...data,
      cards: [
        ...data.cards,
        {
          id: `card-${Date.now()}`,
          title: "",
          desc: "",
          cocok: "",
          features: [""],
          image: "",
        },
      ],
    });
  }

  function removeCard(i: number) {
    const cards = data.cards.filter((_: any, idx: number) => idx !== i);
    setData({ ...data, cards });
  }

  function updateCard(i: number, field: string, val: any) {
    const cards = [...data.cards];
    cards[i] = { ...cards[i], [field]: val };
    setData({ ...data, cards });
  }

  function addFeature(cardIdx: number) {
    const cards = [...data.cards];
    cards[cardIdx].features = [...(cards[cardIdx].features || []), ""];
    setData({ ...data, cards });
  }

  function updateFeature(cardIdx: number, featIdx: number, val: string) {
    const cards = [...data.cards];
    cards[cardIdx].features[featIdx] = val;
    setData({ ...data, cards });
  }

  function removeFeature(cardIdx: number, featIdx: number) {
    const cards = [...data.cards];
    cards[cardIdx].features = cards[cardIdx].features.filter((_: any, i: number) => i !== featIdx);
    setData({ ...data, cards });
  }

  function moveCard(i: number, dir: "up" | "down") {
    const cards = [...data.cards];
    const j = dir === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= cards.length) return;
    [cards[i], cards[j]] = [cards[j], cards[i]];
    setData({ ...data, cards });
  }

  async function uploadImage(cardIdx: number, file: File) {
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const d = await res.json();
      if (d.url) updateCard(cardIdx, "image", d.url);
    } catch {}
  }

  if (loading) return <div className="text-sm text-slate-400 py-8 text-center">Memuat...</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Program</h2>
          <p className="text-sm text-slate-400 mt-0.5">Kelola program kelas</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 bg-[#007ab3] hover:bg-[#00608e] text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-50 cursor-pointer">
            <Save className="w-3.5 h-3.5" /> {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      {msg && (
        <div className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
          msg === "Berhasil disimpan!" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
        }`}>
          {msg}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Header</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Badge</label>
              <input type="text" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Judul</label>
              <input type="text" value={data.subtitle} onChange={(e) => setData({...data, subtitle: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Tombol CTA</label>
              <input type="text" value={data.cta} onChange={(e) => setData({...data, cta: e.target.value})} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Card Program</h3>
            <button onClick={addCard} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#007ab3] hover:text-white border border-[#007ab3] hover:bg-[#007ab3] rounded-lg transition-all cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Tambah Card
            </button>
          </div>
          <div className="space-y-6">
            {data.cards.map((card: any, i: number) => (
              <div key={card.id || i} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Card {i + 1}</span>
                    <button onClick={() => moveCard(i, "up")} disabled={i === 0} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30 cursor-pointer">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button onClick={() => moveCard(i, "down")} disabled={i === data.cards.length - 1} className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30 cursor-pointer">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => removeCard(i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Judul</label>
                      <input type="text" value={card.title} onChange={(e) => updateCard(i, "title", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Gambar</label>
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) await uploadImage(i, file);
                      }} className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#007ab3]/10 file:text-[#007ab3] hover:file:bg-[#007ab3]/20 file:cursor-pointer cursor-pointer" />
                      {card.image && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <img src={card.image} alt="" className="w-10 h-10 object-cover rounded border border-slate-200" />
                          <button onClick={() => updateCard(i, "image", "")} className="text-[11px] text-red-500 hover:text-red-700 font-medium cursor-pointer">Hapus</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Deskripsi</label>
                    <textarea rows={2} value={card.desc} onChange={(e) => updateCard(i, "desc", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Cocok untuk</label>
                    <textarea rows={2} value={card.cocok} onChange={(e) => updateCard(i, "cocok", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3] resize-none" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold text-slate-500">Fitur</label>
                      <button onClick={() => addFeature(i)} className="text-xs text-[#007ab3] hover:text-[#00608e] font-medium cursor-pointer">+ Tambah Fitur</button>
                    </div>
                    <div className="space-y-2">
                      {(card.features || []).map((feat: string, fi: number) => (
                        <div key={fi} className="flex items-center gap-2">
                          <input type="text" value={feat} onChange={(e) => updateFeature(i, fi, e.target.value)} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#007ab3]/20 focus:border-[#007ab3]" />
                          <button onClick={() => removeFeature(i, fi)} className="p-1 text-red-400 hover:text-red-600 cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [active, setActive] = useState("hero");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <Link href="/" className="text-lg font-bold text-slate-800 block">LPK Admin</Link>
            <p className="text-xs text-slate-400 mt-0.5">Bojonegoro Mendunia</p>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {sidebarItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  active === id
                    ? "bg-[#007ab3] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-slate-100">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3.5 py-2.5 text-sm text-slate-500 hover:text-[#007ab3] rounded-lg hover:bg-slate-50 transition-colors mb-1"
            >
              <Eye className="w-4 h-4" /> Lihat Situs
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl">
            {active === "dashboard" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Selamat datang di panel admin LPK Bojonegoro Mendunia</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-sm font-semibold text-slate-600">Hero Section</p>
                    <p className="text-xs text-slate-400 mt-1">Konten hero sudah tersimpan</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-sm font-semibold text-slate-600">Status</p>
                    <p className="text-xs text-slate-400 mt-1">Database connected</p>
                  </div>
                </div>
              </div>
            )}
            {active === "hero" && <HeroEditor />}
            {active === "about" && <AboutEditor />}
            {active === "programs" && <ProgramEditor />}
            {active === "contact" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Kontak</h2>
                  <p className="text-sm text-slate-400 mt-0.5">Halaman ini masih dalam pengembangan</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
