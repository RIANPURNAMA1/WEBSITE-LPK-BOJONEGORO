import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");
config({ path: envPath });

async function main() {
  const host = process.env.DB_HOST || "localhost";
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_NAME || "lpk_bojonegoro";

  console.log(`\n📦 Connecting to MySQL: ${user}@${host}/${database}`);

  const conn = await mysql.createConnection({ host, user, password, database });

  const tables = await conn.query(`SHOW TABLES LIKE 'about_content'`);
  if (tables[0].length === 0) {
    console.log(`📄 Table about_content not found, creating table...`);
    await conn.query(`CREATE TABLE IF NOT EXISTS about_content (
      id INT PRIMARY KEY DEFAULT 1,
      siapa_kami VARCHAR(255) NOT NULL DEFAULT 'Siapa Kami',
      tentang_kami VARCHAR(255) NOT NULL DEFAULT 'Tentang Kami',
      desc1 TEXT NOT NULL,
      desc2 TEXT NOT NULL,
      stats1_num VARCHAR(20) NOT NULL DEFAULT '500+',
      stats1_label VARCHAR(100) NOT NULL DEFAULT 'Alumni Berangkat',
      stats2_num VARCHAR(20) NOT NULL DEFAULT '10+',
      stats2_label VARCHAR(100) NOT NULL DEFAULT 'Tahun Pengalaman',
      stats3_num VARCHAR(20) NOT NULL DEFAULT '50+',
      stats3_label VARCHAR(100) NOT NULL DEFAULT 'Mitra Perusahaan',
      keunggulan_badge VARCHAR(100) NOT NULL DEFAULT 'Keunggulan',
      keunggulan_title VARCHAR(255) NOT NULL DEFAULT 'Kenapa harus ikut Kelas di Mendunia.id?',
      keunggulan_cards TEXT NOT NULL DEFAULT '[]',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    await conn.query(`INSERT INTO about_content (id) VALUES (1) ON DUPLICATE KEY UPDATE id=id`);
    console.log(`✅ Table created.`);
  }

  const columns = await conn.query(`SHOW COLUMNS FROM about_content LIKE 'about_image'`);
  if (columns[0].length === 0) {
    console.log(`🔄 Adding column about_image to about_content...`);
    await conn.query(
      `ALTER TABLE about_content ADD COLUMN about_image VARCHAR(500) NOT NULL DEFAULT '' AFTER desc2`
    );
    console.log(`✅ Column added successfully.`);
  } else {
    console.log(`✅ Column about_image already exists.`);
  }

  await conn.end();
  console.log(`👋 Done.\n`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
