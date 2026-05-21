# LPK Bojonegoro Mendunia

Landing page untuk **LPK Bojonegoro Mendunia** — Lembaga Pelatihan Kerja yang berfokus pada pelatihan dan penempatan tenaga kerja ke Jepang melalui program Gakkou, Tokutei Ginou, Care Worker, dan Hospitality.

🌐 **Live:** [lpk-bojonegoro-mendunia.vercel.app](https://lpk-bojonegoro-mendunia.vercel.app)

---

## Fitur

- **Hero** — Banner utama dengan CTA daftar dan hubungi
- **About** — Profil lembaga, statistik (alumni, pengalaman, mitra), dan 4 keunggulan
- **Programs** — 4 program pelatihan dengan modal detail
- **Gallery** — Galeri foto dengan lightbox interaktif
- **Facilities** — 6 fasilitas unggulan
- **Testimonials** — Testimoni alumni dengan animasi marquee
- **FAQ** — Akordion tanya jawab
- **Contact** — Info kontak + form yang redirect ke WhatsApp
- **WhatsApp Float** — Tombol chat WhatsApp floating
- **Dark Mode** — Toggle tema gelap/terang dengan persistensi localStorage
- **Multi Bahasa** — Indonesia, English, 日本語
- **Animasi** — Scroll-triggered animations dengan Framer Motion

## Tech Stack

| Teknologi | Keterangan |
|-----------|------------|
| [Next.js 16](https://nextjs.org) | React framework |
| [React 19](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Bahasa pemrograman |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS |
| [Framer Motion](https://motion.dev) | Animasi |
| [Lucide React](https://lucide.dev) | Ikon |

## Memulai

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build production
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Proyek

```
├── app/
│   ├── globals.css          # Global styles + Tailwind v4
│   ├── layout.tsx           # Root layout (metadata, font, providers)
│   └── page.tsx             # Home page (semua sections)
├── components/
│   ├── About.tsx
│   ├── Contact.tsx          # Form → WhatsApp redirect
│   ├── Facilities.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Gallery.tsx
│   ├── Hero.tsx
│   ├── LanguageProvider.tsx # i18n context (id/en/ja)
│   ├── Navbar.tsx
│   ├── ProgramDetail.tsx
│   ├── Programs.tsx
│   ├── RegisterModal.tsx    # Daftar modal → WhatsApp redirect
│   ├── SplashScreen.tsx
│   ├── Testimonials.tsx
│   ├── ThemeProvider.tsx    # Dark mode context
│   └── WhatsAppFloat.tsx
├── locales/
│   ├── id.json              # Bahasa Indonesia (default)
│   ├── en.json              # English
│   └── ja.json              # 日本語
├── public/                  # Assets statis
├── utils/
│   └── i18n.ts              # Internationalization utility
└── package.json
```

## Konfigurasi

### Nomor WhatsApp

Ganti nomor WhatsApp tujuan di:
- `components/Contact.tsx` — `wa.me/6281234567890`
- `components/RegisterModal.tsx` — `wa.me/6281234567890`
- `components/Contact.tsx` — link kontak WhatsApp

### Google Maps

Ganti embed URL di `components/Contact.tsx` (iframe src) dengan lokasi yang diinginkan.

### Logo

Ganti file di `public/logo-1.png` (dark mode) dan `public/logo-2.png` (light mode).

### Konten & Terjemahan

Semua teks dikelola melalui file JSON di folder `locales/`. Tambah/ubah bahasa dengan mengedit:
- `locales/id.json`
- `locales/en.json`
- `locales/ja.json`

## Deployment

Deploy ke Vercel:

```bash
npx vercel
```

Atau hubungkan repository GitHub ke [Vercel](https://vercel.com) untuk auto-deploy.
