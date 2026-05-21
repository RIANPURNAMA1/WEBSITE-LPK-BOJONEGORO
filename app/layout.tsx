import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { RegisterProvider } from "@/components/RegisterModal";
import SplashScreen from "@/components/SplashScreen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LPK Bojonegoro Mendunia - Lembaga Pelatihan Kerja ke Jepang",
  icons: { icon: "/logo-2.png" },
  description:
    "LPK Bojonegoro Mendunia adalah lembaga pelatihan kerja profesional yang membantu tenaga kerja Indonesia meraih kesempatan kerja di Jepang. Program pelatihan bahasa Jepang, budaya, dan keahlian teknis.",
  keywords:
    "LPK Bojonegoro, magang Jepang, kerja Jepang, lembaga pelatihan kerja, pelatihan bahasa Jepang, Bojonegoro",
  authors: [{ name: "LPK Bojonegoro Mendunia" }],
  openGraph: {
    title: "LPK Bojonegoro Mendunia - Siap Berangkat ke Jepang?",
    description:
      "Mulai perjalananmu hari ini. Daftar sekarang dan dapatkan bimbingan profesional sampai keberangkatan.",
    type: "website",
    locale: "id_ID",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (localStorage.getItem('theme') === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <RegisterProvider>
              <SplashScreen>{children}</SplashScreen>
            </RegisterProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
