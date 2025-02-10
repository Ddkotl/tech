import { Page } from "@playwright/test";
import { parseBrands } from "./db_seed/parse_brands";
import { getModelsUrlByBrand } from "./get_models_url_by_brand";

export const getAllBrandsAndModels = async (page: Page) => {
  await page.goto("https://www.gsmarena.com/makers.php3", {
    waitUntil: "domcontentloaded",
  });
  const articles = await page
    .locator(".st-text > table > tbody > tr > td ")
    .evaluateAll((el) => {
      return el
        .map((e) => ({
          brand: e
            .querySelector("a")
            ?.firstChild?.nodeValue?.trim()
            .toLocaleLowerCase(),
          brandListUrl: e.querySelector("a")?.getAttribute("href"),
        }))
        .filter(
          (e) =>
            e.brand !== undefined &&
            e.brandListUrl !== undefined &&
            e.brandListUrl !== null,
        );
    });

  for (const article of articles) {
    if (article.brand) {
      await parseBrands(article.brand);
      if (!article.brandListUrl) continue;
      const modelsUrl = await getModelsUrlByBrand(article.brandListUrl, page);
      console.log(modelsUrl);
    }
  }
};
