"use server";
import { dataBase } from "@/shared/lib/db_conect";
import { Prisma } from "@prisma/client";

export const getAllBrands = async (): Promise<
  Prisma.BrandsGetPayload<{
    include: {
      _count: { select: { phones: true } };
    };
  }>[]
> => {
  try {
    const brands = await dataBase.brands.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: { select: { phones: true } },
      },
    });

    return brands;
  } catch (error) {
    console.error("Ошибка при получении брендов:", error);
    return [];
  }
};
