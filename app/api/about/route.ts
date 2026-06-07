import { NextResponse } from "next/server";
import { query } from "@/utils/db";

const defaultCards = [
  { key: "terjangkau", title: "Biaya Terjangkau", desc: "Kami menawarkan biaya pendidikan yang kompetitif dengan kualitas terbaik. Dengan sistem cicilan yang fleksibel, Anda bisa mengikuti pelatihan tanpa terbebani biaya besar di awal." },
  { key: "kurikulum", title: "Kurikulum Terstruktur", desc: "Kurikulum kami dirancang secara sistematis oleh tenaga pengajar berpengalaman. Materi pembelajaran disusun step by step dari dasar hingga mahir." },
  { key: "bukuPanduan", title: "Buku Panduan Lengkap", desc: "Setiap peserta mendapatkan buku panduan lengkap yang mencakup materi bahasa, budaya, dan persiapan kerja di Jepang/Korea." },
  { key: "jaringan", title: "Jaringan Luas", desc: "Kami memiliki jaringan luas dengan perusahaan dan mitra di Jepang dan Korea untuk membuka peluang kerja lebih besar bagi alumni." },
  { key: "garansi", title: "Garansi Mengulang", desc: "Kami memberikan garansi mengulang kelas secara gratis sampai lulus sertifikasi bahasa, tanpa biaya tambahan." },
  { key: "danaTalang", title: "Dana Talangan", desc: "Kami menyediakan dana talangan keberangkatan dengan akad syariah untuk meringankan biaya awal pemberangkatan." },
];

export async function GET() {
  try {
    let rows = await query<any[]>("SELECT * FROM about_content WHERE id = 1");
    if (rows.length === 0) {
      return NextResponse.json({
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
        keunggulanCards: defaultCards,
      });
    }
    const r = rows[0];
    return NextResponse.json({
      siapaKami: r.siapa_kami,
      tentangKami: r.tentang_kami,
      desc1: r.desc1,
      desc2: r.desc2,
      aboutImage: r.about_image || "",
      stats1Num: r.stats1_num,
      stats1Label: r.stats1_label,
      stats2Num: r.stats2_num,
      stats2Label: r.stats2_label,
      stats3Num: r.stats3_num,
      stats3Label: r.stats3_label,
      keunggulanBadge: r.keunggulan_badge,
      keunggulanTitle: r.keunggulan_title,
      keunggulanCards: typeof r.keunggulan_cards === "string" ? JSON.parse(r.keunggulan_cards) : r.keunggulan_cards,
    });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const cards = JSON.stringify(body.keunggulanCards || defaultCards);

    await query(
      `INSERT INTO about_content (id, siapa_kami, tentang_kami, desc1, desc2, about_image, stats1_num, stats1_label, stats2_num, stats2_label, stats3_num, stats3_label, keunggulan_badge, keunggulan_title, keunggulan_cards)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         siapa_kami=VALUES(siapa_kami), tentang_kami=VALUES(tentang_kami),
         desc1=VALUES(desc1), desc2=VALUES(desc2), about_image=VALUES(about_image),
         stats1_num=VALUES(stats1_num), stats1_label=VALUES(stats1_label),
         stats2_num=VALUES(stats2_num), stats2_label=VALUES(stats2_label),
         stats3_num=VALUES(stats3_num), stats3_label=VALUES(stats3_label),
         keunggulan_badge=VALUES(keunggulan_badge), keunggulan_title=VALUES(keunggulan_title),
         keunggulan_cards=VALUES(keunggulan_cards)`,
      [
        body.siapaKami || "Siapa Kami",
        body.tentangKami || "Tentang Kami",
        body.desc1 || "",
        body.desc2 || "",
        body.aboutImage || "",
        body.stats1Num || "500+",
        body.stats1Label || "Alumni Berangkat",
        body.stats2Num || "10+",
        body.stats2Label || "Tahun Pengalaman",
        body.stats3Num || "50+",
        body.stats3Label || "Mitra Perusahaan",
        body.keunggulanBadge || "Keunggulan",
        body.keunggulanTitle || "Kenapa harus ikut Kelas di Mendunia.id?",
        cards,
      ]
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
