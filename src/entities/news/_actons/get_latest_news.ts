"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { PartialNews } from "../_domain/types";

export const getLatestNews = async (count: number): Promise<PartialNews[]> => {
  try {
    const news = await dataBase.news.findMany({
      take: count,
      orderBy: {
        createdAt: "desc",
      },
    });

    return news;
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
};
