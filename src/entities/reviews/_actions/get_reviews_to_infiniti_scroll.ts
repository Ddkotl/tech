"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { PartialReviewsWithTags } from "../_domain/types";

export const getReviewsToInfinitiScroll = async (
  pageParam: number,
  perPage: number,
  searchTerm?: string,
  tagSlug?: string,
): Promise<PartialReviewsWithTags[]> => {
  try {
    const reviews = await dataBase.reviews.findMany({
      where: {
        title: { contains: searchTerm, mode: "insensitive" },
        tags: tagSlug ? { some: { slug: tagSlug } } : undefined,
      },
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
      skip: (pageParam - 1) * perPage,
      take: perPage,
    });

    return reviews;
  } catch (error) {
    console.error("Ошибка при получении обзоров:", error);
    return [];
  }
};
