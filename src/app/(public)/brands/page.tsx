import { getBrandsListWithModelsCountAndPaginaton } from "@/entities/brands";
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
  const pageSize = 10;
  const { brands, totalBrandsCount } =
    await getBrandsListWithModelsCountAndPaginaton(page, pageSize);
  const totalPages = Math.ceil(totalBrandsCount / pageSize);

  return (
    <Container className="h-full flex flex-col flex-1 ">
      <section className="flex flex-col flex-1   gap-4 md:gap-10">
        {brands && brands.length > 0 ? (
          <BrandList brands={brands} />
        ) : (
          <p className="text-center text-muted-foreground">
            Нет доступных брендов
          </p>
        )}
        <PaginationControl
          currentPage={page}
          totalPages={totalPages}
          className="mt-auto "
        />
      </section>
    </Container>
  );
}
