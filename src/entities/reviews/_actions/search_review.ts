"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { PartialReviewsWithTags } from "../_domain/types";

export async function searchReview(query: string): Promise<PartialReviewsWithTags[] | []> {
  if (!query) return [];
  try {
    return await dataBase.reviews.findMany({
      where: {
        title: { contains: query, mode: "insensitive" },
      },
      take: 15, // Ограничиваем количество результатов
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
    });
  } catch (error) {
    console.log("Ошибка при поиске брендов:", error);
    return [];
  }
}
