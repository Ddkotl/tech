import { getBrandsListWithModelsCountAndPaginaton } from "@/entities/brands";
import { BrandSearch } from "@/entities/brands/_ui/brand_search";
import { BrandList } from "@/entities/brands/_ui/brands_list";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Container } from "@/shared/components";
import { PaginationControl } from "@/shared/components/custom/pagination-control";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageTitle =
    page > 1 ? `Брэнды телефонов - Страница ${page}` : "Брэнды телефонов";
  const pageDescription =
    page > 1
      ? `Страница ${page} списка всех доступных брэндов современных смартфонов`
      : "Список всех доступных брэндов современных смартфонов";
  const canonicalUrl =
    page > 1
      ? `https://tech24view.ru/brands?page=${page}`
      : "https://tech24view.ru/brands";

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

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 36;
  const { brands, totalBrandsCount } =
    await getBrandsListWithModelsCountAndPaginaton(page, pageSize);
  const totalPages = Math.ceil(totalBrandsCount / pageSize);

  return (
    <Container className="h-full flex flex-col flex-1 ">
      <section className="flex flex-col flex-1   gap-2 md:gap-4">
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <h1 className="text-lg lg:text-2xl w-full gap-4 text-center md:text-start">
              Брэнды мобильных телефонов
            </h1>
            <BrandSearch />
          </div>
          {brands && brands.length > 0 ? (
            <BrandList brands={brands} />
          ) : (
            <p className="text-center text-muted-foreground">
              Нет доступных брендов
            </p>
          )}
        </div>
        <PaginationControl
          basePath="/brands"
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalBrandsCount}
          className="mt-auto "
        />
      </section>
    </Container>
  );
}
