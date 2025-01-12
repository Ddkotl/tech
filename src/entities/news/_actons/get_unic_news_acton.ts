"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { NewsWithTags } from "../_domain/types";

export const getSingleNewsBySlug = async (
  slug: string,
): Promise<NewsWithTags | null> => {
  const news = await dataBase.news.findUnique({
    where: { slug: slug },
    include: { tags: true },
  });

  return news;
};
