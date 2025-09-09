import { Page } from "playwright";
import { transliterateToUrl } from "../../transliteration";
import { downloadImageForS3 } from "../functions/download_image_for_S3";
import { safeTranslate } from "../functions/safe_translate";
import { generateModelDescription } from "../openai/generate_model_description";
import { parseModel } from "../db_seed/parse_model";
import { translateReleaseDateAI } from "../openai/generate_model_spec/translate_release_date";
import { translateStorageAI } from "../openai/generate_model_spec/translate_storage";
import { translateRamAI } from "../openai/generate_model_spec/translate_ram";
import { dataBase } from "../../db_conect";
import { checkRequestLimits } from "../functions/check_requesl_limits";
import { cleaneText } from "../functions/cleane_text";
export const getModelsByBrand = async (
  modelNotExist: {
    model: string;
    url: string;
  }[],
  brandName: string,
  page: Page,
  pageToImages: Page,
) => {
  for (const model of modelNotExist) {
    await page.goto(`https://www.gsmarena.com/${model.url}`, { timeout: 60000, waitUntil: "domcontentloaded" });
    try {
      await page.waitForSelector(".specs-phone-name-title", { state: "visible", timeout: 60000 });
      await page.waitForSelector(".specs-photo-main  img", { state: "visible", timeout: 60000 });
    } catch (error) {
      console.log(error);
      await checkRequestLimits(page);
    }
    const shortName = model.model;
    const fullName = await page.locator(".specs-phone-name-title").innerText();

    const slug = transliterateToUrl(fullName);

    const existingModel = await dataBase.phoneModels.findUnique({
      where: { slug: slug },
    });

    if (existingModel) {
      console.log(`Модель с таким slug уже существует: ${slug}`);
      continue;
    }

    const imgUrl = await page.locator(".specs-photo-main  img").getAttribute("src");

    const releaseDate = await page.locator('span[data-spec="released-hl"]').innerText();
    const translatedReleaseDate = await safeTranslate(releaseDate, translateReleaseDateAI, fullName);

    const weightAndThicknes = await page.locator('span[data-spec="body-hl"]').innerText();
    const splitedWeightAndThicknes = weightAndThicknes.split(",");
    const weight = splitedWeightAndThicknes[0].replace(/[^0-9.]/g, "");
    const thicknes = splitedWeightAndThicknes[1] ? splitedWeightAndThicknes[1].replace(/[^0-9.]/g, "") : "";

    const os = await page.locator('span[data-spec="os-hl"]').innerText();

    const storage = await page.locator('span[data-spec="storage-hl"]').innerText();
    const translatedStorage = await safeTranslate(storage, translateStorageAI, fullName);
    const ram = await page.locator('strong[class="accent accent-expansion"]').innerText();

    const translatedRam = await safeTranslate(ram, translateRamAI, fullName);

    const processor = await page.locator('div[data-spec="chipset-hl"]').innerText();
    const screen_duim = await page.locator('strong > span[data-spec="displaysize-hl"]').innerText();
    const screen_px = await page.locator('div[data-spec="displayres-hl"]').innerText();

    const camera_photo = await page.locator('strong[class="accent accent-camera"]').innerText();
    const camera_video = await page.locator('div[data-spec="videopixels-hl"]').innerText();
    const batary_capasity = await page.locator('strong[class="accent accent-battery"]').innerText();
    const description = await page.locator('div[id="specs-list"]').innerHTML();
    const translatedDescription = await safeTranslate(description, generateModelDescription, "", 100, "<h2>");

    const modelImgPath = imgUrl
      ? await downloadImageForS3(imgUrl, slug, "models_preview", {
          page: pageToImages,
          convert_to_png: true,
          incriase: true,
          proxy_tor: true,
          remove_wattermark: true,
          textDelete: false,
        })
      : "";
    const contentImagesPaths = [];
    try {
      const imagesPageUrl = await page
        .locator(".article-info-meta > .article-info-meta-link > a")
        .getByText("Pictures")
        .first()
        .getAttribute("href");

      if (imagesPageUrl) {
        await page.goto(`https://www.gsmarena.com/${imagesPageUrl}`, { timeout: 60000, waitUntil: "domcontentloaded" });
        try {
          await page.waitForSelector("#pictures-list", { state: "visible", timeout: 60000 });
        } catch (error) {
          console.log(error);
          await checkRequestLimits(page);
        }
        const imagesSrc = await page
          .locator("#pictures-list > img")
          .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src")).filter((e) => e !== null));
        const slicedImgSrc = imagesSrc.slice(0, 4);
        for (const imgSrc of slicedImgSrc) {
          if (imgSrc) {
            const savedPath = await downloadImageForS3(imgSrc, slug, "models_all", {
              page: pageToImages,
              convert_to_png: true,
              incriase: false,
              proxy_tor: true,
              remove_wattermark: true,
              textDelete: false,
            });
            if (savedPath) {
              contentImagesPaths.push(savedPath);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Ошибка при получении картинок для ${model.model}:`, error);
    }
    await parseModel({
      shortName,
      fullName,
      slug,
      brandName,
      modelImgPath: modelImgPath ? modelImgPath : "/placeholder.png",
      releaseDate: cleaneText(translatedReleaseDate)
        .replace(/, месяц или квартал/gi, "")
        .replace(/месяц или квартал/gi, ""),
      weight: weight,
      thicknes: thicknes,
      os,
      storage: cleaneText(translatedStorage).replace(/[а-я:'";ОЗУПН]/g, ""),
      ram: cleaneText(translatedRam).replace(/[а-яОЗУРАМН:'";]/g, ""),
      processor,
      screen_duim: screen_duim.replace(/[^0-9.]/g, ""),
      screen_px: screen_px.split(" ")[0],
      camera_photo: camera_photo.replace(/MP/gi, " МП"),
      camera_video: camera_video.replace(/p/g, " p"),
      batary_capasity: batary_capasity.replace(/mAh/gi, " мАч"),
      description: translatedDescription.replace(/html/gi, ""),
      contentImagesPaths: contentImagesPaths,
    });

    await page.waitForTimeout(3000);
  }
};
