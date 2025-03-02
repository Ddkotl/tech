import { getNewsWithPaginaton } from "@/entities/news/_actons/get_news_with_pagination";
import { NewsList } from "@/entities/news/_ui/news_list";
import { NewsSearch } from "@/entities/news/_ui/news_search";
import { LastModels } from "@/entities/phone_models";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Container } from "@/shared/components";
import { PaginationControl } from "@/shared/components/custom/pagination-control";
import { REVALIDATE_TIME } from "@/shared/lib/config/public";
import { Sidebar } from "@/widgets/sidebar/app-sidebar";
import { Metadata } from "next";

export const revalidate = REVALIDATE_TIME;

export const metadata: Metadata = generateSEOMetadata({
  title: "Новости",
  description:
    "Получите последние новости технологий, новости технологий и советы по выбору современных гаджетов.",
  keywords: [
    "последние новости",
    "новости технологий",
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
  canonical: "https://tech24view.ru/news",
});

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
          basePath="/reviews"
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
