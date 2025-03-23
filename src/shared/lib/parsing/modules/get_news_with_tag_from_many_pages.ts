import { Page } from "playwright";
import { IsNewsAlresdyParsed } from "../db_seed/is_already_parsed";
import { generateDataForPost } from "../functions/generate_data_for_post";
import { downloadImageForS3 } from "../functions/download_image_for_S3";
import { translateAndUnicTitle } from "../openai/translate_and_untc_title";
import { translateAndUnicText } from "../openai/translate_and_untc_content";
import { GenerateMetaDescription, GenerateMetaTitle } from "../openai/generate_meta";
import { translateTags } from "../openai/translate_tags";
import { ParseNews } from "../db_seed/parse_news";
import { transliterateToUrl } from "../../transliteration";
import { cleanAndParseTags } from "../functions/clean_and_parse_tags";
import { generateTags } from "../openai/generate_tags";
import { cleaneText } from "../functions/cleane_text";
import { safeTranslate } from "../functions/safe_translate";
import { getImagesFromPageGallery } from "./get_images_from_page_galery";
import { checkRequestLimits } from "../functions/check_requesl_limits";

export const parseNewsFromManyPages = async (page: Page, pageToImages: Page, n: number) => {
  for (let i = 1; i <= n; i++) {
    console.log(`Parsing news from page ${i}`);

    await page.goto(`https://www.gsmarena.com/news.php3?iPage=${i}`, { timeout: 60000, waitUntil: "domcontentloaded" });

    try {
      await page.waitForSelector(".news-item", { state: "visible", timeout: 60000 });
    } catch (error) {
      console.log(error);
      await checkRequestLimits(page);
    }

    const articles = await page.locator(".news-item").evaluateAll((elements) =>
      elements.map((el) => ({
        titleForImg: el.querySelector("a > h3")?.textContent?.trim(),
        title: el.querySelector("a > h3")?.textContent?.trim(),
        data: el.querySelector(".meta-line > .meta-item-time")?.textContent?.trim(),
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
      const generatedDate = generateDataForPost(article.data);
      await page.goto(`https://www.gsmarena.com/${article.link}`, { timeout: 60000, waitUntil: "domcontentloaded" });
      try {
        await page.waitForSelector(".review-body", { state: "visible", timeout: 60000 });
      } catch (error) {
        console.log(error);
        await checkRequestLimits(page);
      }
      const content: string[] = await page.locator(".review-body p").allTextContents();
      const contentResponse: string = content.join(" ");
      const tags = await page
        .locator(".article-tags .float-right a")
        .evaluateAll((tags) =>
          tags.map((tag) => tag.textContent?.trim().toLowerCase()).filter((tag) => tag !== undefined),
        );
      if (tags.includes("gsmarena") || tags.includes("weekly poll")) {
        continue;
      }
      const translatedTitle = article.title ? await safeTranslate(article.title, translateAndUnicTitle) : "";
      const slug: string = transliterateToUrl(translatedTitle);
      let imagesSrc: string[] = await page
        .locator(".review-body > img")
        .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src")).filter((e) => e !== null));

      const imgGalery = await getImagesFromPageGallery(page);
      imagesSrc = imagesSrc.concat(imgGalery);

      const translatedContent = await safeTranslate(contentResponse, translateAndUnicText);
      const metaTitle = await safeTranslate(translatedTitle, GenerateMetaTitle);
      const metaDescription = await safeTranslate(translatedContent, GenerateMetaDescription);
      const translatedTags = await safeTranslate(tags.join(","), translateTags);
      const generatedTags = await safeTranslate(translatedContent, generateTags);
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
      // Сохранение превью и всех картинок
      const previewPath = article.previewImageUrl
        ? await downloadImageForS3(article.previewImageUrl, slug, "news_preview", {
            page: pageToImages,
            convert_to_png: false,
            incriase: true,
            proxy_tor: true,
            remove_wattermark: true,
            textDelete: true,
          })
        : null;

      const contentImagesPaths = [];
      for (const imgSrc of imagesSrc) {
        if (imgSrc) {
          const savedPath = await downloadImageForS3(imgSrc, slug, "news", {
            page: pageToImages,
            convert_to_png: false,
            incriase: false,
            proxy_tor: true,
            remove_wattermark: true,
            textDelete: true,
          });
          if (savedPath) contentImagesPaths.push(savedPath);
        }
      }
      await ParseNews(
        cleaneText(metaTitle),
        cleaneText(metaDescription),
        slug,
        generatedDate,
        article.title ? article.title : "",
        translatedTitle ? cleaneText(translatedTitle) : "",
        translatedContent ? cleaneText(translatedContent).replace(/html/gi, "") : "",
        previewPath ? previewPath : "",
        contentImagesPaths,
        parsedTags ? parsedTags : [""],
      );
    }
  }
};
