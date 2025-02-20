import { Container } from "@/shared/components";
import { getBrandBySlug } from "@/entities/brands/_actions/get_brand_by_slug";
import {
  getPhoneModelsListWithPaginaton,
  PhoneModelSearch,
  PhoneModelsList,
} from "@/entities/phone_models";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { PaginationControl } from "@/shared/components/custom/pagination-control";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}): Promise<Metadata> {
  const brand = await getBrandBySlug(params.slug);
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageTitle =
    page > 1
      ? `Модели ${brand?.name} - Страница ${page}`
      : "Модели ${brand?.name}";
  const pageDescription =
    page > 1
      ? `Страница ${page} списка всех доступных моделей ${brand?.name}`
      : `Список всех доступных моделей ${brand?.name}`;
  const canonicalUrl =
    page > 1
      ? `https://tech24view.ru/brands/${params.slug}?page=${page}`
      : "https://tech24view.ru/brands/${params.slug}";

  return generateSEOMetadata({
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `новинки ${brand?.name}`,
      `смартфоны ${brand?.name}`,
      `${brand?.name}`,
      `Модели ${brand?.name}`,
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

export default async function ModelsByBrandPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 30;
  const [brand, models] = await Promise.all([
    getBrandBySlug(params.slug),
    getPhoneModelsListWithPaginaton(params.slug, page, pageSize),
  ]);

  if (!brand) {
    return (
      <div className="text-center text-foreground text-xl mt-10">
        Бренд не найден
      </div>
    );
  }
  const totalPages = Math.ceil(brand._count.phones / pageSize);
  return (
    <Container className="h-full flex flex-col flex-1 ">
      <section className="flex flex-col flex-1   gap-2 md:gap-4">
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <h1 className="text-lg lg:text-2xl w-full gap-4 text-center md:text-start">
              {`Все модели ${brand.name.toUpperCase()}`}
            </h1>
            <PhoneModelSearch brandSlug={params.slug} />
          </div>

          <PhoneModelsList models={models} />
        </div>
        <PaginationControl
          basePath={`/brands/${params.slug}`}
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={brand._count.phones}
          className="mt-auto "
        />
      </section>
    </Container>
  );
}
