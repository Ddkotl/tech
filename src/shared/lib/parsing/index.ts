import { Browser, chromium } from "playwright";

import { parseNewsFromManyPages } from "./modules/get_news_with_tag_from_many_pages";
import { parseReviewsFromManyPages } from "./modules/get_reviews_with_tag_from_many_pages";
import { getAllBrandsAndModels } from "./modules/get_all_brands_and_models";
import { addHTTPheaders } from "./functions/addHTTPheaders";
import { restartTor } from "../tor";

export async function StartParse() {
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless: true });

    // const context = await browser.newContext();
    // const page = await context.newPage();
    const [page, pageToImages] = await addHTTPheaders(browser, false);
    await restartTor();

    await parseNewsFromManyPages(page, pageToImages, 1);
    await getAllBrandsAndModels(page, pageToImages);
    await parseReviewsFromManyPages(page, pageToImages, 1);
  } catch (error) {
    console.log("Error in StartParse", error);
  } finally {
    if (browser) {
      await browser.close();
      console.log("browser closed");
    }
  }
}
