import { NewsList } from "@/entities/news/_ui/news_list";
import { NewsSearch } from "@/entities/news/_ui/news_search";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Title } from "@/shared/components";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = `Новости смартфонов и гаджетов `;
  const pageDescription = "Список всех новостей смартфонов и гаджетов";
  const canonicalUrl = "https://tech24view.ru/news";

  return generateSEOMetadata({
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "брэнды",
      "брэнды смартфонов",
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
    canonical: canonicalUrl,
  });
}

export default async function NewsPage() {
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <Title text=" Новости мобильных телефонов" size="xl" />
          <NewsSearch />
        </div>
        <NewsList />
      </div>
    </main>
  );
}
