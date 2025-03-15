import { getNewsWithPaginaton } from "@/entities/news/_actons/get_news_with_pagination";
import { NewsList } from "@/entities/news/_ui/news_list";
import { NewsSearch } from "@/entities/news/_ui/news_search";
import { LastModels } from "@/entities/phone_models";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Container } from "@/shared/components";
import { PaginationControl } from "@/shared/components/custom/pagination-control";
import { Sidebar } from "@/widgets/sidebar/app-sidebar";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageTitle =
    page > 1
      ? `Новости смартфонов и гаджетов - Страница ${page}`
      : "Новости смартфонов и гаджетов";
  const pageDescription =
    page > 1
      ? `Страница ${page} списка всех новостей смартфонов и гаджетов`
      : "Список всех новостей смартфонов и гаджетов";
  const canonicalUrl =
    page > 1
      ? `https://tech24view.ru/news?page=${page}`
      : "https://tech24view.ru/news";

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

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 6;
  const { news, totalNewsCount } = await getNewsWithPaginaton(page, pageSize);
  const totalPages = Math.ceil(totalNewsCount / pageSize);

  return (
    <Container className="h-full flex  flex-1  gap-2 lg:gap-6 ">
      <section className="flex flex-col flex-1    gap-2 md:gap-4">
        <div className="flex gap-2 lg:gap-4 flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <h1 className="text-base font-bold lg:text-xl w-full gap-4 text-center md:text-start">
              Новости мобильных телефонов
            </h1>
            <NewsSearch />
          </div>
          {news && news.length > 0 ? (
            <NewsList news={news} />
          ) : (
            <p className="text-center text-muted-foreground">
              Нет доступных новостей
            </p>
          )}
        </div>
        <PaginationControl
          basePath="/news"
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalNewsCount}
          className="mt-auto "
        />
      </section>
      <Sidebar children1={<LastModels />} />
    </Container>
  );
}
