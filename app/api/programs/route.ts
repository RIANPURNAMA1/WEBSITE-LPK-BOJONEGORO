import { NextResponse } from "next/server";
import { query } from "@/utils/db";

const defaultCards = [
  {
    id: "jepang",
    title: "Kelas Mendunia Jepang",
    desc: "Pembelajaran bahasa Jepang dan persiapan menjadi pekerja di Jepang",
    cocok: "Kelas ini cocok buat kamu yang ingin bekerja & berkarir di Negara Jepang",
    features: [
      "Proses Belajar 3-5 Bulan",
      "Sertifikat Bahasa JFT A2",
      "Program Kerja bukan Magang",
      "100% Garansi Mengulang Kelas",
      "Dan lain-lain",
    ],
    image: "/class-japan.png",
  },
  {
    id: "korea",
    title: "Kelas Mendunia Korea",
    desc: "Pembelajaran bahasa Korea dan persiapan menjadi pekerja di Korea Selatan",
    cocok: "Kelas ini cocok buat kamu yang ingin bekerja & berkarir di Negara Korea Selatan",
    features: [
      "Proses Belajar 3-4 Bulan",
      "Sertifikat EPS Topik",
      "Program G to G (resmi pemerintah)",
      "100% Garansi Mengulang Kelas",
      "Dan lain-lain",
    ],
    image: "/class-korea.png",
  },
];

export async function GET() {
  try {
    const rows = await query<any[]>("SELECT * FROM program_content WHERE id = 1");
    if (rows.length === 0) {
      return NextResponse.json({
        title: "Program mendunia.id",
        subtitle: "Ada Kelas Apa saja?",
        cta: "Info Selengkapnya",
        cards: defaultCards,
      });
    }
    const r = rows[0];
    return NextResponse.json({
      title: r.title,
      subtitle: r.subtitle,
      cta: r.cta,
      cards: typeof r.cards === "string" ? JSON.parse(r.cards) : r.cards,
    });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const cards = JSON.stringify(body.cards || defaultCards);
    await query(
      `INSERT INTO program_content (id, title, subtitle, cta, cards)
       VALUES (1, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title=VALUES(title), subtitle=VALUES(subtitle),
         cta=VALUES(cta), cards=VALUES(cards)`,
      [
        body.title || "Program mendunia.id",
        body.subtitle || "Ada Kelas Apa saja?",
        body.cta || "Info Selengkapnya",
        cards,
      ]
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
