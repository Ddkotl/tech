import { Page } from "playwright";
import { IsReviewAlreadyParsed } from "./db_seed/is_already_parsed";
import { generateDataForPost } from "./functions/generate_data_for_post";
import { downloadImage } from "./functions/download_image";
import { translateAndUnicTitle } from "./openai/translate_and_untc_title";
import { translateAndUnicText } from "./openai/translate_and_untc_content";
import {
  GenerateMetaDescription,
  GenerateMetaTitle,
} from "./openai/generate_meta";
import { translateTags } from "./openai/translate_tags";
import { ParseReviews } from "./db_seed/parse_reviews";
import { transliterateToUrl } from "../transliteration";
import { cleanAndParseArray } from "./functions/clean_and_parse_tags";
import { generateTags } from "./openai/generate_tags";
import { cleaneText } from "./functions/cleane_text";

export const parseReviewsFromManyPages = async (page: Page, n: number) => {
  for (let i = 1; i <= n; i++) {
    console.log(`Parsing reviews from page ${i}`);
    await page.goto(`https://www.gsmarena.com/reviews.php3?iPage=${i}`, {
      waitUntil: "domcontentloaded",
    });

    const articles = await page
      .locator(".review-item")
      .evaluateAll((elements) =>
        elements.map((el) => ({
          titleForImg: el
            .querySelector(".review-item-content > h3")
            ?.textContent?.trim(),
          data: el
            .querySelector(".meta-line > .meta-item-time")
            ?.textContent?.trim(),
          title: el
            .querySelector(".review-item-content > h3")
            ?.textContent?.trim(),
          link: el
            .querySelector(".review-item-media-wrap > a")
            ?.getAttribute("href"),
          previewImageUrl: el
            .querySelector(".review-item-media-wrap > a > img")
            ?.getAttribute("src"),
        })),
      );

    for (const article of articles) {
      if (!article.link) {
        continue;
      }
      if (article.title ? await IsReviewAlreadyParsed(article.title) : true) {
        continue;
      }

      const generatedDate = generateDataForPost(article.data);

      const contentPages: string[] = [];
      const allImages: string[] = [];
      let mobileModelDescriptionUrl: string = "";
      let currentUrl: string | null =
        `https://www.gsmarena.com/${article.link}`;

      // Обработка всех страниц обзора
      while (currentUrl) {
        await page.goto(currentUrl, { waitUntil: "domcontentloaded" });
        if (!mobileModelDescriptionUrl) {
          const url: string | null = await page
            .locator(".article-info-meta-link .meta-link-specs > a")
            .getAttribute("href");
          if (url) {
            mobileModelDescriptionUrl = url;
          }
        }
        // Извлечение текста текущей страницы
        const content: string[] = await page
          .locator(".review-body p")
          .allTextContents();
        contentPages.push(...content);

        // Извлечение изображений текущей страницы
        const imagesSrc = (await page
          .locator(".review-body > img")
          .evaluateAll((imgs) =>
            imgs
              .map((img) => img.getAttribute("src"))
              .filter((src) => src !== null),
          )) as string[];
        allImages.push(...imagesSrc);

        // Проверка на наличие кнопки "Next page"
        const nextPageElement = await page.locator(".pages-next").nth(0);
        const isDisabled = await nextPageElement.evaluate(
          (el) =>
            el.classList.contains("disabled") ||
            el.getAttribute("href") === "#",
        );

        if (isDisabled) {
          currentUrl = null; // Завершаем цикл
        } else {
          currentUrl = await nextPageElement.getAttribute("href");
          if (currentUrl) {
            currentUrl = `https://www.gsmarena.com/${currentUrl}`;
          }
        }
      }

      // Извлечение тегов
      const tags = await page
        .locator(".article-tags > .float-right >  a")
        .evaluateAll((tags) =>
          tags
            .map((tag) => tag.textContent?.trim().toLowerCase())
            .filter((el) => el !== undefined),
        );

      // Сохранение превью изображения
      const previewPath = article.previewImageUrl
        ? await downloadImage(
            article.previewImageUrl,
            article.titleForImg,
            "reviews_preview",
          )
        : null;

      // Сохранение всех изображений из обзора
      const contentImagesPaths = [];
      for (const imgSrc of allImages) {
        if (imgSrc) {
          const savedPath = await downloadImage(
            imgSrc,
            article.titleForImg,
            "reviews",
          );
          if (savedPath) contentImagesPaths.push(savedPath);
        }
      }
      const translatedTitle = article.title
        ? await translateAndUnicTitle(article.title)
        : "";
      const translatedContent = await translateAndUnicText(
        contentPages.join(" "),
      );
      const metaTitle = await GenerateMetaTitle(
        translatedTitle ? translatedTitle : "",
      );
      const metaDescription = await GenerateMetaDescription(
        translatedContent ? translatedContent : "",
      );

      const translatedTags = await translateTags(tags);
      const generatedTags = await generateTags(
        translatedContent ? translatedContent : "",
      );
      const parsedTags = (() => {
        try {
          return translatedTags
            ? cleanAndParseArray(translatedTags)
            : generatedTags
              ? cleanAndParseArray(generatedTags)
              : [""];
        } catch (e) {
          console.log("Ошибка при парсинге tags", e);
        }
      })();

      const slug: string = transliterateToUrl(
        article.title ? article.title : "",
      );
      await ParseReviews(
        cleaneText(metaTitle),
        cleaneText(metaDescription),
        slug,
        generatedDate,
        article.title ? article.title : "",
        translatedTitle ? cleaneText(translatedTitle) : "",
        translatedContent ? cleaneText(translatedContent) : "",
        previewPath ? previewPath : "",
        contentImagesPaths,
        parsedTags ? parsedTags : [""],
      );
    }
  }
};
