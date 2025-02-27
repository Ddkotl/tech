"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { PartialReviewsWithTags } from "../_domain/types";

export const getReviewsWithPaginaton = async (
  page: number,
  pageSize: number,
): Promise<{
  reviews: PartialReviewsWithTags[];
  totalReviewsCount: number;
}> => {
  try {
    const [reviews, totalReviewsCount] = await Promise.all([
      dataBase.reviews.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          createdAt: true,
          meta_description: true,
          slug: true,
          title: true,
          previewImage: true,
          views: true,
          tags: { select: { slug: true, title: true } },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      dataBase.reviews.count(),
    ]);
    return { reviews, totalReviewsCount };
  } catch (error) {
    console.error("Ошибка при получении обзоров:", error);
    return { reviews: [], totalReviewsCount: 0 };
  }
};
