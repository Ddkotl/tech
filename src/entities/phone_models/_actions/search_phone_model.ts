"use server";

import { dataBase } from "@/shared/lib/db_conect";
import { PartialPhoneModel } from "../_domain/types";

export async function searchPhoneModel(brandSlug: string, query: string): Promise<PartialPhoneModel[] | []> {
  if (!query || !brandSlug) {
    return [];
  }

  try {
    const result = await dataBase.phoneModels.findMany({
      where: {
        brand: { slug: brandSlug },
        short_name: { contains: query, mode: "insensitive" },
      },
      take: 9,
    });

    return result;
  } catch (error) {
    console.log("Ошибка при поиске моделей:", error);
    return [];
  }
}
