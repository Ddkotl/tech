"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { PartialNewsWithTags } from "../_domain/types";

export const getNewsToInfinitiScroll = async (
  pageParam: number,
  perPage: number,
  searchTerm?: string,
  tagSlug?: string,
  newsIds?: string[],
): Promise<PartialNewsWithTags[]> => {
  try {
    const news = await dataBase.news.findMany({
      where: {
        id: newsIds ? { in: newsIds } : undefined,
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

    return news;
  } catch (error) {
    console.error("Ошибка при получении новостей:", error);
    return [];
  }
};
