import { Page } from "playwright";
import { IsReviewAlreadyParsed } from "../db_seed/is_already_parsed";
import { generateDataForPost } from "../functions/generate_data_for_post";
import { downloadImageForS3 } from "../functions/download_image_for_S3";
import { translateAndUnicTitle } from "../openai/translate_and_untc_title";
import { translateAndUnicText } from "../openai/translate_and_untc_content";
import {
  GenerateMetaDescription,
  GenerateMetaTitle,
} from "../openai/generate_meta";
import { translateTags } from "../openai/translate_tags";
import { ParseReviews } from "../db_seed/parse_reviews";
import { transliterateToUrl } from "../../transliteration";
import { cleanAndParseTags } from "../functions/clean_and_parse_tags";
import { generateTags } from "../openai/generate_tags";
import { cleaneText } from "../functions/cleane_text";
import { safeTranslate } from "../functions/safe_translate";

export const parseReviewsFromManyPages = async (page: Page, n: number) => {
  for (let i = n; 0 < i; i--) {
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

    for (const article of articles.reverse()) {
      if (!article.link) {
        continue;
      }
      if (article.title ? await IsReviewAlreadyParsed(article.title) : true) {
        continue;
      }
      // Извлечение тегов
      const tags: string[] = await page
        .locator(".article-tags > .float-right >  a")
        .evaluateAll((tags) =>
          tags
            .map((tag) => tag.textContent?.trim().toLowerCase())
            .filter((el) => el !== undefined),
        );
      if (tags.includes("gsmarena") || tags.includes("weekly poll")) {
        continue;
      }
      const generatedDate: Date = generateDataForPost(article.data);

      const contentPages: string[] = [];
      const allImages: string[] = [];
      let mobileModelName: string = "";
      let currentUrl: string | null =
        `https://www.gsmarena.com/${article.link}`;
      // Обработка всех страниц обзора
      while (currentUrl) {
        await page.goto(currentUrl, { waitUntil: "domcontentloaded" });
        if (!mobileModelName) {
          const shortName: string | null = await page
            .locator('li[class="article-info-meta-link meta-link-specs"]')
            .nth(0)
            .innerText();
          if (shortName) {
            mobileModelName = shortName.trim();
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

      const translatedTitle: string = article.title
        ? await safeTranslate(article.title, translateAndUnicTitle)
        : "";
      const slug: string = transliterateToUrl(translatedTitle);
      // Сохранение превью изображения
      const previewPath: string | null = article.previewImageUrl
        ? await downloadImageForS3(
            article.previewImageUrl,
            slug,
            "reviews_preview",
            false,
            true,
            true,
            true,
          )
        : "";

      // Сохранение всех изображений из обзора
      const contentImagesPaths: string[] = [];
      for (const imgSrc of allImages) {
        if (imgSrc) {
          const savedPath = await downloadImageForS3(
            imgSrc,
            slug,
            "reviews",
            false,
            true,
            true,
            false,
          );
          if (savedPath) contentImagesPaths.push(savedPath);
        }
      }

      const translatedContent: string = await safeTranslate(
        contentPages.join(" "),
        translateAndUnicText,
      );
      const metaTitle: string = await safeTranslate(
        translatedTitle,
        GenerateMetaTitle,
      );
      const metaDescription: string = await safeTranslate(
        translatedContent,
        GenerateMetaDescription,
      );

      const translatedTags = await safeTranslate(tags.join(","), translateTags);
      const generatedTags = await safeTranslate(
        translatedContent,
        generateTags,
      );
      const parsedTags = (() => {
        try {
          return translatedTags
            ? cleanAndParseTags(translatedTags)
            : generatedTags
              ? cleanAndParseTags(generatedTags)
              : [];
        } catch (e) {
          console.log("Ошибка при парсинге tags", e);
        }
      })();

      await ParseReviews(
        cleaneText(metaTitle),
        cleaneText(metaDescription),
        slug,
        generatedDate,
        article.title ? article.title : "",
        cleaneText(translatedTitle),
        cleaneText(translatedContent).replace(/html/gi, ""),
        previewPath ? previewPath : "",
        contentImagesPaths,
        parsedTags ? parsedTags : [],
        mobileModelName,
      );
    }
  }
};
