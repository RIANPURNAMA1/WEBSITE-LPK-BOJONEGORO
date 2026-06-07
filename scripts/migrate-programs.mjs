import mysql from "mysql2/promise";
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

  console.log(`🔄 Creating table program_content...`);
  await conn.query(`
    CREATE TABLE IF NOT EXISTS program_content (
      id INT PRIMARY KEY DEFAULT 1,
      title VARCHAR(255) NOT NULL DEFAULT 'Program mendunia.id',
      subtitle VARCHAR(255) NOT NULL DEFAULT 'Ada Kelas Apa saja?',
      cta VARCHAR(100) NOT NULL DEFAULT 'Info Selengkapnya',
      cards TEXT NOT NULL DEFAULT '[]',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  await conn.query(`INSERT INTO program_content (id) VALUES (1) ON DUPLICATE KEY UPDATE id=id`);
  console.log(`✅ Table program_content created.`);

  await conn.end();
  console.log(`👋 Done.\n`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
