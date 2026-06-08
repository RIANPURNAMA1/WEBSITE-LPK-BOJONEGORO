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

  console.log(`\n📦 Connecting to MySQL: ${user}@${host}`);

  const conn = await mysql.createConnection({ host, user, password, multipleStatements: true });

  console.log(`✅ Connected. Creating database "${database}"...`);
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conn.query(`USE \`${database}\``);

  const schemaPath = resolve(__dirname, "..", "schema.sql");
  const sql = readFileSync(schemaPath, "utf-8");

  console.log(`📄 Running schema.sql...`);
  await conn.query(sql);
  console.log(`✅ Tables created successfully.`);

  await conn.end();
  console.log(`👋 Done.\n`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
