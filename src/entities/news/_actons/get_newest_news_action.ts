"use server";

import { dataBase } from "@/shared/lib/db_conect";

export const getLatestNewsAction = async (count: number) => {
  const news = await dataBase.news.findMany({
    take: count,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
    },
  });
  return news;
};
