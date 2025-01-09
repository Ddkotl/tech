import { generateMetadata } from "@/features/seo/generate_metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Новости",
  description:
    "Получите последние обзоры смартфонов, новости технологий и советы по выбору современных гаджетов.",
  keywords: [
    "технологии",
    "смартфоны",
    "обзоры",
    "новости",
    "новости смартфонов",
    "гаджеты",
    "мобильные телефоны",
    "инновации",
  ],
  ogImage: "/logo_opengraf.jpg",
  canonical: "https://tech24view.ru",
});

export default async function NewsPage() {
  return (
    <div>
      <h1>News Page</h1>
    </div>
  );
}
