"use server";

import { dataBase } from "@/shared/lib/db_conect";

export async function getNews(page: number = 1, pageSize: number = 10) {
  const skip = (page - 1) * pageSize;

  const [news, total] = await Promise.all([
    dataBase.news.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        tags: true,
        _count: {
          select: {
            bookmarks: true,
          },
        },
      },
    }),
    dataBase.news.count(),
  ]);
  const newsWithIncludes = news.map((item) => ({
    ...item,
    bookmarksCount: item._count.bookmarks,
  }));
  return {
    newsWithIncludes,
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
  };
}
