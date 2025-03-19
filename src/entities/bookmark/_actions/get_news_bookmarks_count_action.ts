"use server";

import { dataBase } from "@/shared/lib/db_conect";

export const getNewsBookmarksCountAction = async (newsId: string): Promise<number> => {
  const bookmarksCount = await dataBase.newsBookmark.count({
    where: {
      newsId: newsId,
    },
  });
  return bookmarksCount;
};
