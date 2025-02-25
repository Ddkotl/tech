import { Page } from "@playwright/test";
import { transliterateToUrl } from "../../transliteration";
import { downloadImage } from "../functions/download_image_for_S3";
import { safeTranslate } from "../functions/safe_translate";
import { generateModelDescription } from "../openai/generate_model_description";
import { parseModel } from "../db_seed/parse_model";
import { translateReleaseDateAI } from "../openai/generate_model_spec/translate_release_date";
import { translateWeightAI } from "../openai/generate_model_spec/translate_weight";
import { translateThicknesAI } from "../openai/generate_model_spec/translate_thicknes";
import { translateStorageAI } from "../openai/generate_model_spec/translate_storage";
import { translateRamAI } from "../openai/generate_model_spec/translate_ram";
import { dataBase } from "../../db_conect";
export const getModelsByBrand = async (
  modelNotExist: {
    model: string;
    url: string;
  }[],
  brandName: string,
  page: Page,
) => {
  for (const model of modelNotExist) {
    await page.goto(`https://www.gsmarena.com/${model.url}`, {
      waitUntil: "domcontentloaded",
    });
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

    const imgUrl = await page
      .locator(".specs-photo-main  img")
      .getAttribute("src");
    const modelImgPath = imgUrl
      ? await downloadImage(imgUrl, slug, "models_main", true, true)
      : "";

    const releaseDate = await page
      .locator('span[data-spec="released-hl"]')
      .innerText();
    const translatedReleaseDate = await safeTranslate(
      releaseDate,
      fullName,
      translateReleaseDateAI,
    );

    const weightAndThicknes = await page
      .locator('span[data-spec="body-hl"]')
      .innerText();
    // const splitedWeightAndThicknes = weightAndThicknes.split(",");
    // const weight = splitedWeightAndThicknes[0].replace(/[^0-9.]/g, "");
    // const thicknes = splitedWeightAndThicknes[1]
    //   ? splitedWeightAndThicknes[1].replace(/[^0-9.]/g, "")
    //   : "";
    const translatedWeight = await safeTranslate(
      weightAndThicknes,
      fullName,
      translateWeightAI,
    );
    const translatedThicknes = await safeTranslate(
      weightAndThicknes,
      fullName,
      translateThicknesAI,
    );

    const os = await page.locator('span[data-spec="os-hl"]').innerText();

    const storage = await page
      .locator('span[data-spec="storage-hl"]')
      .innerText();
    const translatedStorage = await safeTranslate(
      storage,
      fullName,
      translateStorageAI,
    );
    const ram = await page
      .locator('strong[class="accent accent-expansion"]')
      .innerText();

    const translatedRam = await safeTranslate(ram, fullName, translateRamAI);

    const processor = await page
      .locator('div[data-spec="chipset-hl"]')
      .innerText();
    const screen_duim = await page
      .locator('strong > span[data-spec="displaysize-hl"]')
      .innerText();
    const screen_px = await page
      .locator('div[data-spec="displayres-hl"]')
      .innerText();

    const camera_photo = await page
      .locator('strong[class="accent accent-camera"]')
      .innerText();
    const camera_video = await page
      .locator('div[data-spec="videopixels-hl"]')
      .innerText();
    const batary_capasity = await page
      .locator('strong[class="accent accent-battery"]')
      .innerText();
    const description = await page.locator('div[id="specs-list"]').innerHTML();
    const translatedDescription = await generateModelDescription(description);

    const imagesPageUrl = await page
      .locator(".article-info-meta > .article-info-meta-link > a")
      .getByText("Pictures")
      .first()
      .getAttribute("href");

    const contentImagesPaths = [];
    if (imagesPageUrl) {
      await page.goto(`https://www.gsmarena.com/${imagesPageUrl}`);
      const imagesSrc = await page
        .locator("#pictures-list > img")
        .evaluateAll((imgs) =>
          imgs.map((img) => img.getAttribute("src")).filter((e) => e !== null),
        );
      for (const imgSrc of imagesSrc) {
        if (imgSrc) {
          const savedPath = await downloadImage(
            imgSrc,
            slug,
            "news",
            true,
            true,
          );
          if (savedPath) {
            contentImagesPaths.push(savedPath);
          }
        }
      }
    }
    await parseModel({
      shortName,
      fullName,
      slug,
      brandName,
      modelImgPath: modelImgPath ? modelImgPath : "/placeholder.png",
      releaseDate: translatedReleaseDate,
      weight: translatedWeight,
      thicknes: translatedThicknes,
      os,
      storage: translatedStorage.replace(/[а-я:'";ОЗУПН]/g, ""),
      ram: translatedRam.replace(/[а-яОЗУРАМН:'";]/g, ""),
      processor,
      screen_duim: screen_duim.replace(/[^0-9.]/g, ""),
      screen_px: screen_px.split(" ")[0],
      camera_photo: camera_photo.replace(/MP/gi, " МП"),
      camera_video: camera_video.replace(/NO/gi, "-"),
      batary_capasity: batary_capasity.replace(/mAh/gi, " мАч"),
      description: translatedDescription,
      contentImagesPaths: contentImagesPaths,
    });

    await page.waitForTimeout(3000);
  }
};
