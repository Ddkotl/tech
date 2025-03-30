"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { BrandWithModelsCount } from "../_domain/types";

export const getBrandsListWithModelsCount = async (
  pageParam: number,
  perPage: number,
  searchTerm?: string,
): Promise<BrandWithModelsCount[]> => {
  try {
    const brands = dataBase.brands.findMany({
      where: {
        name: { contains: searchTerm, mode: "insensitive" },
      },
      orderBy: {
        name: "asc",
      },
      include: {
        _count: { select: { phones: true } },
      },
      skip: (pageParam - 1) * perPage,
      take: perPage,
    });

    return brands;
  } catch (error) {
    console.error("Ошибка при получении брендов:", error);
    return [];
  }
};
