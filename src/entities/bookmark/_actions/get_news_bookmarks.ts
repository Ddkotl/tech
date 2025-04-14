import { dataBase } from "@/shared/lib/db_conect";

export async function getNewsBookmarks(userId: string) {
  try {
    const news_bookmarks = await dataBase.newsBookmark.findMany({
      where: {
        userId: userId,
      },
      select: {
        newsId: true,
      },
    });
    return news_bookmarks;
  } catch (error) {
    console.log(error);
  }
}
