"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { PartialPhoneModel } from "../_domain/types";

export const getPhoneModelsListWithPaginaton = async (
  slug: string,
  page: number,
  pageSize: number,
): Promise<PartialPhoneModel[] | []> => {
  try {
    const models = dataBase.phoneModels.findMany({
      where: { brand: { slug: slug } },
      orderBy: {
        createdAt: "desc",
      },
      select: { id: true, short_name: true, main_image: true, slug: true },

      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return models;
  } catch (error) {
    console.log("Ошибка при получении моделей:", error);
    return [];
  }
};
