import { chromium } from "playwright";

import { parseNewsFromManyPages } from "./modules/get_news_with_tag_from_many_pages";
import { parseReviewsFromManyPages } from "./modules/get_reviews_with_tag_from_many_pages";
import { getAllBrandsAndModels } from "./modules/get_all_brands_and_models";

export const StartParse = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await parseNewsFromManyPages(page, 2);
  await getAllBrandsAndModels(page);
  await parseReviewsFromManyPages(page, 2);

  await browser.close();
};

StartParse();
