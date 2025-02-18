import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Обзоры",
  description:
    "Получите последние обзоры смартфонов, новости технологий и советы по выбору современных гаджетов.",
  keywords: [
    "технологии",
    "смартфоны",
    "обзоры",
    "обзоры смартфонов",
    "новости",
    "новости смартфонов",
    "гаджеты",
    "мобильные телефоны",
    "инновации",
  ],
  ogImage: "/logo_opengraf.jpg",
  canonical: "https://tech24view.ru",
});

export default async function ReviewsPage() {
  return (
    <div>
      <h1>Reviews Page</h1>
    </div>
  );
}
