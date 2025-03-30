"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { PartialReviews } from "../_domain/types";

export const getLatestReviews = async ({
  count,
  tagSlug,
}: {
  count?: number;
  tagSlug?: string;
}): Promise<PartialReviews[]> => {
  try {
    const reviews = await dataBase.reviews.findMany({
      take: count,
      where: { tags: { some: { slug: tagSlug } } },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
};
