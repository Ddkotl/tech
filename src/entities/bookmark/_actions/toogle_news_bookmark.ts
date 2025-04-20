"use server";
import { dataBase } from "@/shared/lib/db_conect";

export async function toggleNewsBookmarkAction(userId: string, newsId: string) {
  try {
    const bookmark = await dataBase.newsBookmark.findFirst({
      where: {
        userId: userId,
        newsId: newsId,
      },
    });
    if (!bookmark) {
      await dataBase.newsBookmark.create({
        data: {
          userId: userId,
          newsId: newsId,
        },
      });
    } else {
      await dataBase.newsBookmark.delete({
        where: {
          id: bookmark.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
