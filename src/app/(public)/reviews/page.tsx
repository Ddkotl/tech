import {
  getReviewsWithPaginaton,
  ReviewsList,
  ReviewsSearch,
} from "@/entities/reviews";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { PaginationControl } from "@/shared/components/custom/pagination-control";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Обзоры",
  description:
    "Получите последние обзоры смартфонов, новости технологий и советы по выбору современных гаджетов.",
  keywords: [
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
  canonical: "https://tech24view.ru/reviews",
});

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 6;
  const { reviews, totalReviewsCount } = await getReviewsWithPaginaton(
    page,
    pageSize,
  );
  const totalPages = Math.ceil(totalReviewsCount / pageSize);

  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <div className="flex gap-2 lg:gap-4 flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <h1 className="text-base font-bold lg:text-xl w-full gap-4 text-center md:text-start">
            Обзоры мобильных телефонов
          </h1>
          <ReviewsSearch />
        </div>
        {reviews && reviews.length > 0 ? (
          <ReviewsList reviews={reviews} />
        ) : (
          <p className="text-center text-muted-foreground">
            Нет доступных обзоров
          </p>
        )}
      </div>
      <PaginationControl
        basePath="/reviews"
        currentPage={page}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalReviewsCount}
        className="mt-auto "
      />
    </main>
  );
}
