"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { PartialNewsWithTags } from "../_domain/types";

export async function searchNews(
  query: string,
): Promise<PartialNewsWithTags[] | []> {
  if (!query) return [];
  try {
    return await dataBase.news.findMany({
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
    console.log("Ошибка при поиске новостей:", error);
    return [];
  }
}
