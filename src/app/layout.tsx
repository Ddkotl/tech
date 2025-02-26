import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "./_providers/app-provider";
import { GoogleAnalytics } from "@/features/seo/google-analitic";
import { privateConfig } from "@/shared/lib/config/private";
import { ScrollToTopButton } from "@/shared/components/custom/scroll_button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "tech24view",
    template: "%s | tech24view",
  },
  description:
    "Обзоры смартфонов, свежие новости технологий и полезные советы для пользователей современных гаджетов.",
  keywords:
    "технологии, смартфоны, обзоры, новости, гаджеты, мобильные телефоны, инновации",
  metadataBase: new URL("https://tech24view.ru"),
  openGraph: {
    title: "tech24view - Обзоры смартфонов и новости технологий",
    description:
      "Получите последние обзоры смартфонов, новости технологий и советы по выбору современных гаджетов.",
    url: "https://tech24view.ru",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/img/logo_opengraf.jpg",
        width: 1200,
        height: 630,
        alt: "tech24view - Логотип",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" dir="ltr" suppressHydrationWarning className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <GoogleAnalytics gaId={privateConfig.GOOGLE_ANALITICS_4_ID || ""} />
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased h-full relative`}
      >
        <AppProvider>{children}</AppProvider>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
