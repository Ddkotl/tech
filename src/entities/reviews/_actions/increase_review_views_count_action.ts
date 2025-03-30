"use server";
import { dataBase } from "@/shared/lib/db_conect";

export const increaseReviewsViewsCountAction = async (slug: string): Promise<void> => {
  try {
    await dataBase.reviews.update({
      where: { slug: slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.log("Error increasing views count:", error);
  }
};
