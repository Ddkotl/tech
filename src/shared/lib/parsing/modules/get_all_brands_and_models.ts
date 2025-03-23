import { Page } from "playwright";
import { parseBrands } from "../db_seed/parse_brands";
import { getModelsUrlByBrand } from "./get_models_url_by_brand";
import { checkModelsExisting } from "../db_seed/check_models_existing";
import { getModelsByBrand } from "./get_models_by_brand";
import { checkRequestLimits } from "../functions/check_requesl_limits";

export const getAllBrandsAndModels = async (page: Page, pageToImages: Page) => {
  await page.goto("https://www.gsmarena.com/makers.php3", { timeout: 60000, waitUntil: "domcontentloaded" });
  try {
    await page.waitForSelector(".st-text", { state: "visible", timeout: 60000 });
  } catch (error) {
    console.log(error);
    await checkRequestLimits(page);
  }
  const articles = await page.locator(".st-text > table > tbody > tr > td ").evaluateAll((el) => {
    return el
      .map((e) => ({
        brand: e.querySelector("a")?.firstChild?.nodeValue?.trim().toLowerCase(),
        brandListUrl: e.querySelector("a")?.getAttribute("href"),
      }))
      .filter((e) => e.brand !== undefined && e.brandListUrl !== undefined && e.brandListUrl !== null);
  });
  for (const article of articles) {
    if (article.brand) {
      await parseBrands(article.brand);
    }
  }
  console.log("brands parsed");
  for (const article of articles) {
    if (article.brand && article.brandListUrl) {
      const modelsUrl = await getModelsUrlByBrand(article.brandListUrl, page);
      const modelNotExist = await checkModelsExisting(modelsUrl);
      await getModelsByBrand(modelNotExist, article.brand, page, pageToImages);
      await page.waitForTimeout(2000);
    }
  }
};
