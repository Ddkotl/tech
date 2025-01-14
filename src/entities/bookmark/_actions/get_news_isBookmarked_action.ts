"use server";

import { dataBase } from "@/shared/lib/db_conect";

export const getNewsIsBookmarkedAction = async (
  newsId: string,
  userId: string,
): Promise<boolean> => {
  const isBookmarked = await dataBase.newsBookmark.findFirst({
    where: {
      newsId: newsId,
      userId: userId,
    },
  });
  if (isBookmarked) {
    return true;
  } else {
    return false;
  }
};
