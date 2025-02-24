import path from "path";
import { chromium } from "playwright";
import fs from "fs";
import os from "os";

export const removeWattermark = async (
  imageBuffer: Buffer,
): Promise<Buffer> => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    // Создаем временный файл из Buffer
    const tempFilePath = path.join(os.tmpdir(), `input_image.png-`);
    fs.writeFileSync(tempFilePath, imageBuffer);

    // Открываем сайт
    console.log("Открываем сайт...");
    await page.goto("https://dewatermark.ai/upload");
    console.log("Сайт открыт");
    await page.waitForTimeout(1000);
    await page.waitForTimeout(5000);
    await page.screenshot({ path: "./img_for_test/1.png", fullPage: true });
    // Загружаем изображение на сайт
    const inputFileSelector = 'input[type="file"]';
    await page.waitForSelector(inputFileSelector, {
      timeout: 60000,
      state: "attached",
    });
    await page.setInputFiles(inputFileSelector, tempFilePath);
    console.log("Изображение загружено");

    // Ждем, пока изображение обработается
    await page.waitForTimeout(5000);
    await page.screenshot({ path: "./img_for_test/2.png", fullPage: true });
    await page.waitForSelector("img[alt='enhanced-image']", {
      timeout: 60000,
    });

    console.log("Изображение обработано");
    await page.waitForTimeout(5000);
    await page.screenshot({ path: "./img_for_test/3.png", fullPage: true });
    // Ждем, пока появится кнопка для скачивания
    const downloadButtonSelector = "button:has-text('Download')";
    await page.waitForSelector(downloadButtonSelector, { timeout: 60000 });

    // Перехватываем событие скачивания
    const [download] = await Promise.all([
      page.waitForEvent("download"), // Ждем события скачивания
      page.click(downloadButtonSelector), // Кликаем по кнопке для скачивания
    ]);

    // Определяем временный путь для скачивания
    const tempDownloadPath = path.join(os.tmpdir(), "processed_image.png");

    // Сохраняем файл на диск
    await download.saveAs(tempDownloadPath);

    console.log("Изображение без вотермарки сохранено");

    // Читаем файл как Buffer
    const processedImageBuffer = fs.readFileSync(tempDownloadPath);

    console.log("Изображение без вотермарки получено как Buffer");
    fs.unlinkSync(tempFilePath); // Удаляем временный файл с исходным изображением
    fs.unlinkSync(tempDownloadPath); // Удаляем временный файл с обработанным изображением
    // Возвращаем Buffer
    return processedImageBuffer;
  } catch (error) {
    console.error("Ошибка при удалении фона:", error);
    throw error;
  } finally {
    await browser.close();
  }
};
