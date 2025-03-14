import { Metadata } from "next";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Button } from "@/shared/components";
import Link from "next/link";
import { getLatestNewsAction } from "@/entities/news/_actons/get_newest_news_action";
import { NewsWithIncludes } from "@/entities/news";

export const metadata: Metadata = generateSEOMetadata({
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
  const latestNews: NewsWithIncludes[] = await getLatestNewsAction(20);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row gap-4  justify-between items-center mb-4">
        <h1 className="text-lg md:text-3xl font-bold ml-6">
          Последние новости
        </h1>
        <Button
          variant="outline"
          className="mr-6 flex items-center justify-center"
        >
          <Link href={"/news"}>Все новости</Link>
        </Button>
      </div>
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
