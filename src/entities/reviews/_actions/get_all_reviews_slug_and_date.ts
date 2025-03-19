import { dataBase } from "@/shared/lib/db_conect";
import { PartialReviewsBySitemap } from "../_domain/types";

export const getAllReviewsSlugAndDate = async (): Promise<PartialReviewsBySitemap[] | []> => {
  try {
    const reviews = await dataBase.reviews.findMany({
      select: {
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return reviews;
  } catch (error) {
    console.log(error);
    return [];
  }
};
