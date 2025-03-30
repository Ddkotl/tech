import { ReviewsList, ReviewsSearch } from "@/entities/reviews";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Обзоры",
  description: "Получите последние обзоры смартфонов, новости технологий и советы по выбору современных гаджетов.",
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
  canonical: "https://tech24view.ru/reviews",
});

export default async function NewsPage() {
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <Title text="Обзоры мобильных телефонов" size="xl" />
          <ReviewsSearch />
        </div>
        <ReviewsList />
      </div>
    </main>
  );
}
