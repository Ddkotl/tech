import { getNews } from "@/features/news/news-list/_action/get-news-action";
import NewsList from "@/features/news/news-list/news-list";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
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

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { newsWithIncludes, totalPages, currentPage } = await getNews(page);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Последние новости</h1>
      <NewsList
        initialNews={newsWithIncludes}
        totalPages={totalPages}
        initialPage={currentPage}
      />
    </div>
  );
}
