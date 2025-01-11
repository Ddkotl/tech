import { Page } from "playwright";
import { IsNewsAlresdyParsed } from "./db_seed/is_already_parsed";
import { generateDataForPost } from "./functions/generate_data_for_post";
import { downloadImage } from "./functions/download_image";
import { translateAndUnicTitle } from "./openai/translate_and_untc_title";
import { translateAndUnicText } from "./openai/translate_and_untc_content";
import {
  GenerateMetaDescription,
  GenerateMetaTitle,
} from "./openai/generate_meta";
import { translateTags } from "./openai/translate_tags";
import { ParseNews } from "./db_seed/parse_news";
import { transliterateToUrl } from "../transliteration";

export const parseNewsFromManyPages = async (page: Page, n: number) => {
  for (let i = 1; i <= n; i++) {
    console.log(`Parsing news from page ${i}`);

    await page.goto(`https://www.gsmarena.com/news.php3?iPage=${i}`, {
      waitUntil: "domcontentloaded",
    });

    const articles = await page.locator(".news-item").evaluateAll((elements) =>
      elements.map((el) => ({
        titleForImg: el.querySelector("a > h3")?.textContent?.trim(),
        title: el.querySelector("a > h3")?.textContent?.trim(),
        link: el.querySelector("a")?.getAttribute("href"),
        previewImageUrl: el.querySelector("img")?.getAttribute("src"),
      })),
    );
    for (const article of articles) {
      if (!article.link) {
        continue;
      }
      if (article.title ? await IsNewsAlresdyParsed(article.title) : true) {
        continue;
      }
      await page.goto(`https://www.gsmarena.com/${article.link}`);
      const date = await page.locator(".float-left .dtreviewed").textContent();
      const generatedDate = date ? generateDataForPost(date) : new Date();
      const content = await page.locator(".review-body p").allTextContents();
      const contentResponse = content.join(" ");
      const tags = await page
        .locator(".article-tags .float-right a")
        .evaluateAll((tags) =>
          tags
            .map((tag) => tag.textContent?.trim().toLowerCase())
            .filter((tag) => tag !== undefined),
        );
      const imagesSrc = await page
        .locator(".review-body > img")
        .evaluateAll((imgs) =>
          imgs.map((img) => img.getAttribute("src")).filter((e) => e !== null),
        );
      // Сохранение превью и всех картинок
      const previewPath = article.previewImageUrl
        ? await downloadImage(
            article.previewImageUrl,
            article.titleForImg,
            "news_preview",
          )
        : null;

      const contentImagesPaths = [];
      for (const imgSrc of imagesSrc) {
        if (imgSrc) {
          const savedPath = await downloadImage(
            imgSrc,
            article.titleForImg,
            "news",
          );
          if (savedPath) contentImagesPaths.push(savedPath);
        }
      }
      const translatedTitle = article.title
        ? await translateAndUnicTitle(article.title)
        : "";
      const translatedContent = await translateAndUnicText(contentResponse);
      const metaTitle = await GenerateMetaTitle(
        translatedTitle ? translatedTitle.replace(/\\"/g, "") : "",
      );
      const metaDescription = await GenerateMetaDescription(
        translatedContent ? translatedContent.replace(/\\"/g, "") : "",
      );
      console.log(tags);
      const translatedTags = await translateTags(tags);
      const parsedTags = (() => {
        try {
          console.log(translatedTags);
          return translatedTags
            ? JSON.parse(translatedTags.replace(/\\"/g, '"'))
            : [];
        } catch (error) {
          console.error("Ошибка при парсинге translatedTags:", error);
          return [];
        }
      })();

      const slug: string = transliterateToUrl(
        article.title ? article.title : "",
      );
      await ParseNews(
        metaTitle,
        metaDescription,
        slug,
        generatedDate,
        article.title ? article.title : "",
        translatedTitle ? translatedTitle.replace(/\\"/g, "") : "",
        translatedContent ? translatedContent.replace(/\\"/g, "") : "",
        previewPath ? previewPath : "",
        contentImagesPaths,
        parsedTags,
      );
    }
  }
};
