import { dataBase } from "../../db_conect";
import { transliterateToUrl } from "../../transliteration";

export const parseBrands = async (brandName: string) => {
  try {
    const brandSlug = transliterateToUrl(brandName);
    await dataBase.brands.upsert({
      where: { name: brandName },
      update: {},
      create: {
        name: brandName,
        slug: brandSlug,
      },
    });
    console.log(`Brand "${brandName}" processed successfully.`);
  } catch (error) {
    console.error(`Error processing brand "${brandName}":`, error);
  }
};
