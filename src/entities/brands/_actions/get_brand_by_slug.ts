import { dataBase } from "@/shared/lib/db_conect";
import { Brands } from "@prisma/client";

export const getBrandBySlug = async (slug: string): Promise<Brands | null> => {
  try {
    return await dataBase.brands.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
};
