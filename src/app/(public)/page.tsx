import { Metadata } from "next";
import { generateMetadata } from "@/features/seo/generate_metadata";
import { dataBase } from "@/shared/lib/db_conect";
import { NewsCarousel } from "@/entities/news/_ui/news-carusel";
import { Button } from "@/shared/components";
import Link from "next/link";

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

async function getLatestNews(count: number) {
  const news = await dataBase.news.findMany({
    take: count,
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
  const latestNews = await getLatestNews(20);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row gap-4  justify-between items-center mb-4">
        <h1 className="text-lg md:text-3xl font-bold ml-8">
          Последние новости о смартфонах
        </h1>
        <Button
          variant="outline"
          className="mr-8 flex items-center justify-center"
        >
          <Link href={"/news"}>Все новости</Link>
        </Button>
      </div>
      <NewsCarousel news={latestNews} />
      {/* <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
          {latestNews.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))}
        </div>
      </div> */}
    </div>
  );
}
