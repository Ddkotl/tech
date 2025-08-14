import { Browser, BrowserContext, chromium, Page } from "playwright";

import { parseNewsFromManyPages } from "./modules/get_news_with_tag_from_many_pages";
import { parseReviewsFromManyPages } from "./modules/get_reviews_with_tag_from_many_pages";
import { getAllBrandsAndModels } from "./modules/get_all_brands_and_models";
import { addHTTPheaders } from "./functions/addHTTPheaders";

export async function StartParse() {
  const timeoutPromise = new Promise((_, rej) => {
    setTimeout(() => rej(new Error("Tech parse time out after 5 hours")), 5 * 60 * 60 * 1000);
  });
  try {
    Promise.race([ExeParse(), timeoutPromise]);
  } catch (error) {
    console.error("Error in start parse", error);
  }
}

async function ExeParse() {
  let browser: Browser | undefined;
  let context: BrowserContext | undefined;
  let contextToImages: BrowserContext | undefined;
  let page: Page | undefined;
  let pageToImages: Page | undefined;
  try {
    browser = await chromium.launch({ headless: true });

    // const context = await browser.newContext();
    // const page = await context.newPage();
    const data = await addHTTPheaders(browser, false);
    page = data.page;
    pageToImages = data.pageToImages;
    context = data.context;
    contextToImages = data.contextToImages;
    await parseNewsFromManyPages(page, pageToImages, 1);
    await getAllBrandsAndModels(page, pageToImages);
    await parseReviewsFromManyPages(page, pageToImages, 1);
  } catch (error) {
    console.log("Error in StartParse", error);
  } finally {
    if (page) {
      await page.close();
      console.log("page closed");
    }
    if (pageToImages) {
      await pageToImages.close();
      console.log("pageToImages closed");
    }
    if (context) {
      await context.close();
      console.log("context closed");
    }
    if (contextToImages) {
      await contextToImages.close();
      console.log("contextToImages closed");
    }
    if (browser) {
      await browser.close();
      console.log("browser closed");
    }
  }
}
