import { Page } from "@playwright/test";
import { transliterateToUrl } from "../../transliteration";
import { downloadImage } from "./download_image";
import { safeTranslate } from "./safe_translate";
import { generateModelDescription } from "../openai/generate_model_description";
import { parseModel } from "../db_seed/parse_model";
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

    const imgUrl = await page
      .locator(".specs-photo-main  img")
      .getAttribute("src");
    const modelImgPath = imgUrl
      ? await downloadImage(imgUrl, slug, "models_main", false)
      : "";
    const releaseDate = await page
      .locator('span[data-spec="released-hl"]')
      .innerText();
    const translatedReleaseDate = await safeTranslate(
      releaseDate.replace(/Released/g, ""),
    );

    const weightAndThicknes = await page
      .locator('span[data-spec="body-hl"]')
      .innerText();
    const splitedWeightAndThicknes = weightAndThicknes.split(",");
    const weight = splitedWeightAndThicknes[0].replace(/[^0-9.]/g, "");
    const thicknes = splitedWeightAndThicknes[1]
      ? splitedWeightAndThicknes[1].replace(/[^0-9.]/g, "")
      : "";

    const os = await page.locator('span[data-spec="os-hl"]').innerText();
    const storage = await page
      .locator('span[data-spec="storage-hl"]')
      .innerText();
    const translatedStorage = await safeTranslate(storage);
    const ram = await page
      .locator('strong[class="accent accent-expansion"]')
      .innerText();

    const translatedRam = await safeTranslate(ram);
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
    await parseModel({
      shortName,
      fullName,
      slug,
      brandName,
      modelImgPath: modelImgPath ? modelImgPath : "placeholder.png",
      releaseDate: translatedReleaseDate.replace(/[:'";]/g, ""),
      weight,
      thicknes,
      os,
      storage: translatedStorage.replace(/[а-я:'";ОЗУП]/g, ""),
      ram: translatedRam.replace(/[а-яОЗУРАМ:'";]/g, ""),
      processor,
      screen_duim: screen_duim.replace(/[^0-9.]/g, ""),
      screen_px: screen_px.split(" ")[0],
      camera_photo: camera_photo.replace(/MP/gi, "МП"),
      camera_video,
      batary_capasity: batary_capasity.replace(/mAh/gi, "мАч"),
      description: translatedDescription,
    });

    await page.waitForTimeout(3000);
  }
};
