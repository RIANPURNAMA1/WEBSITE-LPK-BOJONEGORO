CREATE DATABASE IF NOT EXISTS lpk_bojonegoro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lpk_bojonegoro;

CREATE TABLE IF NOT EXISTS hero_content (
  id INT PRIMARY KEY DEFAULT 1,
  badge_daftar VARCHAR(255) NOT NULL DEFAULT 'Daftar Sekarang',
  badge_mulai VARCHAR(255) NOT NULL DEFAULT 'Mulai Perjalananmu',
  heading1 VARCHAR(255) NOT NULL DEFAULT 'Peluang Kerja Mendunia di',
  heading2 VARCHAR(255) NOT NULL DEFAULT 'Jepang dan Korea',
  description TEXT NOT NULL DEFAULT 'Kami bersamai sampai kamu bisa sukses kerja mendunia ke Jepang dan Korea Selatan.',
  btn_mulai VARCHAR(255) NOT NULL DEFAULT 'Mulai Perjalananmu',
  btn_konsultasi VARCHAR(255) NOT NULL DEFAULT 'Konsultasi Gratis',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO hero_content (id) VALUES (1) ON DUPLICATE KEY UPDATE id=id;

CREATE TABLE IF NOT EXISTS about_content (
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
);

ALTER TABLE about_content MODIFY keunggulan_cards TEXT NOT NULL DEFAULT '[]';

INSERT INTO about_content (id) VALUES (1) ON DUPLICATE KEY UPDATE id=id;

CREATE TABLE IF NOT EXISTS program_content (
  id INT PRIMARY KEY DEFAULT 1,
  title VARCHAR(255) NOT NULL DEFAULT 'Program mendunia.id',
  subtitle VARCHAR(255) NOT NULL DEFAULT 'Ada Kelas Apa saja?',
  cta VARCHAR(100) NOT NULL DEFAULT 'Info Selengkapnya',
  cards TEXT NOT NULL DEFAULT '[]',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO program_content (id) VALUES (1) ON DUPLICATE KEY UPDATE id=id;
