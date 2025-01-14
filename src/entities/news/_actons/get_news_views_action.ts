"use server";

import { dataBase } from "@/shared/lib/db_conect";

export const getNewsViewsActon = async (newsId: string): Promise<number> => {
  try {
    const news = await dataBase.news.findFirst({
      where: { id: newsId },
    });
    return news ? news.views : 0;
  } catch (error) {
    throw new Error(`Error : ${error}`);
  }
};
