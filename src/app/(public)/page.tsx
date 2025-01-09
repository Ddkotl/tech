import { Metadata } from "next";
import { generateMetadata } from "@/features/seo/generate_metadata";
import { dataBase } from "@/shared/lib/db_conect";
import NewsCard from "@/entities/news/_ui/news-card";

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

async function getLatestNews() {
  const news = await dataBase.news.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
    },
  });
  return news;
}

export default async function Home() {
  const latestNews = await getLatestNews();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Последние новости</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {latestNews.map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} />
        ))}
      </div>
    </div>
  );
}
