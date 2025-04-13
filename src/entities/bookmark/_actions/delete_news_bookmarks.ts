import { dataBase } from "@/shared/lib/db_conect";

export async function deleteAllNewsBookmarksByUser(userId: string) {
  try {
    return await dataBase.newsBookmark.deleteMany({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNewsBookmarkByUser(userId: string, newsId: string) {
  try {
    return await dataBase.newsBookmark.deleteMany({
      where: {
        userId: userId,
        newsId: newsId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
