import path from "path";
import { chromium } from "playwright";
import fs from "fs";
import os from "os";
import axios from "axios";

/**
 * Удаляет фон с изображения через сайт cutout с использованием Playwright,
 * при этом входное изображение передается в виде Buffer.
 * @param page - Экземпляр страницы Playwright.
 * @param imageBuffer - Изображение в виде Buffer.
 * @returns Buffer с изображением без фона.
 */
export const removeBackgroundWithCutout = async (
  imageBuffer: Buffer,
): Promise<Buffer> => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const tempFilePath = path.join(os.tmpdir(), "input_image.png");
  const tempDownloadPath = path.join(os.tmpdir(), "processed_image.png");

  try {
    // Создаем временный файл из Buffer
    fs.writeFileSync(tempFilePath, imageBuffer);
    console.log("Временный файл создан:", tempFilePath);

    // Открываем сайт
    console.log("Открываем сайт...");
    await page.goto("https://www.cutout.pro/remove-background/upload", {
      waitUntil: "networkidle",
    });
    console.log("Сайт открыт");

    // Ждем появления элемента для загрузки изображения
    const inputFileSelector = 'input[type="file"]';
    await page.setInputFiles(inputFileSelector, tempFilePath);
    console.log("Элемент для загрузки изображения найден");

    await page.waitForTimeout(5000);
    await page.screenshot({ path: "./img_for_test/screen/11.png" });
    // Ждем, пока появится обработанное изображение
    const processedImageSelector = 'img[alt="edit picture"]';
    console.log("Ожидание обработанного изображения...");
    await page.waitForSelector(processedImageSelector, { timeout: 120000 });
    console.log("Обработанное изображение найдено");

    // Получаем URL обработанного изображения
    const imageUrl = await page.$eval(processedImageSelector, (img) => {
      if (img instanceof HTMLImageElement) {
        return img.src; // Возвращаем src только для элементов <img>
      }
      throw new Error("Элемент не является изображением");
    });
    console.log("URL обработанного изображения:", imageUrl);

    // Загружаем изображение по URL
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const processedImageBuffer = Buffer.from(response.data, "binary");
    console.log("Изображение без фона загружено по URL");

    // Сохраняем изображение на диск (опционально)
    fs.writeFileSync(tempDownloadPath, processedImageBuffer);
    console.log("Изображение без фона сохранено:", tempDownloadPath);

    // Возвращаем Buffer
    return processedImageBuffer;
  } catch (error) {
    console.error("Ошибка при удалении фона:", error);
    throw error;
  } finally {
    await browser.close();

    // Удаляем временные файлы в любом случае
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
      console.log("Временный файл удален:", tempFilePath);
    }
    if (fs.existsSync(tempDownloadPath)) {
      fs.unlinkSync(tempDownloadPath);
      console.log("Временный файл удален:", tempDownloadPath);
    }
  }
};
