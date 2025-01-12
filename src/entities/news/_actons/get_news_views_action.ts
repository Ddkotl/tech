"use server";

import { dataBase } from "@/shared/lib/db_conect";

export const getNewsViewsActon = async (slug: string): Promise<number> => {
  try {
    const news = await dataBase.news.findFirst({
      where: { slug: slug },
    });
    return news ? news.views : 0;
  } catch (error) {
    throw new Error(`Error : ${error}`);
  }
};
