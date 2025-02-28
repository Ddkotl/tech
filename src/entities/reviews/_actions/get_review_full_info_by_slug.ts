"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { ReviewFullInfo } from "../_domain/types";

export const getReviewsFullInfoBySlug = async (
  slug: string,
): Promise<ReviewFullInfo | null> => {
  try {
    return await dataBase.reviews.findUnique({
      where: { slug: slug },
      include: {
        phoneModel: {
          select: {
            id: true,
            slug: true,
            short_name: true,
            full_name: true,
            main_image: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("getReviewsFullInfo error", error);
    return null;
  }
};
