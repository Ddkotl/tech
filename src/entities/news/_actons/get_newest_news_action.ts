"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { NewsWithIncludes } from "../_domain/types";

export const getLatestNewsAction = async (
  count: number,
): Promise<NewsWithIncludes[]> => {
  const news = await dataBase.news.findMany({
    take: count,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      bookmarks: true,
      _count: {
        select: {
          bookmarks: true,
        },
      },
    },
  });
  const newsWithIncludes = news.map((item) => ({
    ...item,
    bookmarksCount: item._count.bookmarks,
  }));
  return newsWithIncludes;
};
