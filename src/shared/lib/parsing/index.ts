import { chromium } from "playwright";

import { parseNewsFromManyPages } from "./get_news_with_tag_from_many_pages";
import { parseReviewsFromManyPages } from "./get_reviews_with_tag_from_many_pages";

export const StartParse = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await parseNewsFromManyPages(page, 1);
  await parseReviewsFromManyPages(page, 1);

  await browser.close();
};

StartParse();
