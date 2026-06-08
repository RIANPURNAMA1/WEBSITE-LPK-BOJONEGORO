import { NextResponse } from "next/server";
import { query } from "@/utils/db";

export async function GET() {
  try {
    let rows = await query<any[]>("SELECT * FROM hero_content WHERE id = 1");
    if (rows.length === 0) {
      return NextResponse.json({
        badgeDaftar: "Daftar Sekarang",
        badgeMulai: "Mulai Perjalananmu",
        heading1: "Peluang Kerja Mendunia di",
        heading2: "Jepang dan Korea",
        description: "Kami bersamai sampai kamu bisa sukses kerja mendunia ke Jepang dan Korea Selatan.",
        btnMulai: "Mulai Perjalananmu",
        btnKonsultasi: "Konsultasi Gratis",
      });
    }
    const r = rows[0];
    return NextResponse.json({
      badgeDaftar: r.badge_daftar,
      badgeMulai: r.badge_mulai,
      heading1: r.heading1,
      heading2: r.heading2,
      description: r.description,
      btnMulai: r.btn_mulai,
      btnKonsultasi: r.btn_konsultasi,
    });
  } catch {
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      badgeDaftar,
      badgeMulai,
      heading1,
      heading2,
      description,
      btnMulai,
      btnKonsultasi,
    } = body;

    await query(
      `INSERT INTO hero_content (id, badge_daftar, badge_mulai, heading1, heading2, description, btn_mulai, btn_konsultasi)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         badge_daftar = VALUES(badge_daftar),
         badge_mulai = VALUES(badge_mulai),
         heading1 = VALUES(heading1),
         heading2 = VALUES(heading2),
         description = VALUES(description),
         btn_mulai = VALUES(btn_mulai),
         btn_konsultasi = VALUES(btn_konsultasi)`,
      [
        badgeDaftar || "Daftar Sekarang",
        badgeMulai || "Mulai Perjalananmu",
        heading1 || "Peluang Kerja Mendunia di",
        heading2 || "Jepang dan Korea",
        description || "",
        btnMulai || "Mulai Perjalananmu",
        btnKonsultasi || "Konsultasi Gratis",
      ]
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
