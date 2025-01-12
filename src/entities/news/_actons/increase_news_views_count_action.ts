"use server";
import { dataBase } from "@/shared/lib/db_conect";

export const increaseNewsViewsCountAction = async (slug: string) => {
  await dataBase.news.update({
    where: { slug: slug },
    data: {
      views: {
        increment: 1,
      },
    },
  });
};
