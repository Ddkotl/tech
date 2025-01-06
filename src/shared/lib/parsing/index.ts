import { chromium } from "playwright";
import { setupDirectories } from "./functions/setup_dirs";
import { parseNewsFromManyPages } from "./get_news_with_tag_from_many_pages";
import { parseReviewsFromManyPages } from "./get_reviews_with_tag_from_many_pages";

export const StartParse = async () => {
  await setupDirectories();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await parseNewsFromManyPages(page, 1);
  await parseReviewsFromManyPages(page, 1);

  await browser.close();
};

StartParse();
