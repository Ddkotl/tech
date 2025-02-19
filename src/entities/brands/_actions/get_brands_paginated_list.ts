"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { Prisma } from "@prisma/client";

export const getBrandsListWithModelsCountAndPaginaton = async (
  page: number,
  pageSize: number,
): Promise<{
  brands: Prisma.BrandsGetPayload<{
    include: {
      _count: { select: { phones: true } };
    };
  }>[];
  totalBrandsCount: number;
}> => {
  try {
    const [brands, totalBrandsCount] = await Promise.all([
      dataBase.brands.findMany({
        orderBy: {
          name: "asc",
        },
        include: {
          _count: { select: { phones: true } },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      dataBase.brands.count(),
    ]);
    return { brands, totalBrandsCount };
  } catch (error) {
    console.error("Ошибка при получении брендов:", error);
    return { brands: [], totalBrandsCount: 0 };
  }
};
