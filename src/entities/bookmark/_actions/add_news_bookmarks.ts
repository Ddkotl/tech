"use server";

import { dataBase } from "@/shared/lib/db_conect";

export async function addNewsBookmarks(newsIds: string[], userId: string) {
  try {
    // Проверяем существование пользователя
    const user = await dataBase.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    // Проверяем существование новостей
    const existingNews = await dataBase.news.findMany({
      where: {
        id: { in: newsIds },
      },
      select: {
        id: true,
      },
    });

    // Получаем только существующие ID новостей
    const existingNewsIds = existingNews.map((news) => news.id);

    // Добавляем закладки через транзакцию
    await dataBase.$transaction(
      existingNewsIds.map((newsId) =>
        dataBase.newsBookmark.upsert({
          where: {
            userId_newsId: {
              userId,
              newsId,
            },
          },
          create: {
            newsId,
            userId,
          },
          update: {}, // Ничего не обновляем, если закладка уже существует
        }),
      ),
    );
    const updatedBookmarks = await dataBase.newsBookmark.findMany({
      where: { id: userId },
      select: {
        newsId: true,
      },
    });
    return updatedBookmarks.map((e) => e.newsId);
  } catch (error) {
    console.error("Ошибка при добавлении закладок:", error);
    return [];
  }
}
