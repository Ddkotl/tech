import { Metadata } from "next";
import { generateMetadata } from "@/features/seo/generate_metadata";

export const metadata: Metadata = generateMetadata({
  title: "Главная",
  description:
    "Получите последние обзоры смартфонов, новости технологий и советы по выбору современных гаджетов.",
  keywords: [
    "технологии",
    "смартфоны",
    "обзоры",
    "новости",
    "гаджеты",
    "мобильные телефоны",
    "инновации",
  ],
  ogImage: "/logo_opengraf.jpg",
  canonical: "https://tech24view.ru",
});

export default async function Home() {
  return <>home</>;
}
