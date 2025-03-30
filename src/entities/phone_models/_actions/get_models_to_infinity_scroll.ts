"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { PartialPhoneModel } from "../_domain/types";

export const getPhoneModelsListToInfinityScroll = async (
  brandSlug: string,
  pageParam: number,
  perPage: number,
  searchTerm?: string,
): Promise<PartialPhoneModel[] | []> => {
  try {
    const models = dataBase.phoneModels.findMany({
      where: { brand: { slug: brandSlug }, full_name: { contains: searchTerm, mode: "insensitive" } },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        short_name: true,
        full_name: true,
        main_image: true,
        slug: true,
      },

      skip: (pageParam - 1) * perPage,
      take: perPage,
    });

    return models;
  } catch (error) {
    console.log("Ошибка при получении моделей:", error);
    return [];
  }
};
