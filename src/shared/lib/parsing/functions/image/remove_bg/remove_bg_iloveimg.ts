import path from "path";
import { Page } from "playwright";
import fs from "fs";
import os from "os";
import { simulateMouseMovement } from "../simulate_mouse_move";

export const removeBgImageILoveImage = async (imageBuffer: Buffer, page: Page): Promise<Buffer> => {
  try {
    const tempFilePath = path.join(os.tmpdir(), `input_image.png`);
    const tempDownloadPath = path.join(os.tmpdir(), "processed_image.png");

    fs.writeFileSync(tempFilePath, imageBuffer);

    // Создаем временный файл из Buffer

    // Открываем сайт
    // console.log("Открываем сайт...");
    await page.goto("https://www.iloveimg.com/remove-background", { timeout: 60000, waitUntil: "domcontentloaded" });
    // console.log("Сайт открыт");

    // Нажимаем на кнопку согласия (если она есть)
    // const coockyOk = "button:has-text('Consent')";
    // await page.waitForSelector(coockyOk, { timeout: 60000 });
    // await page.locator(coockyOk).click();
    await simulateMouseMovement(page);

    // Загружаем изображение на сайт
    const inputFileSelector = 'input[type="file"]';
    await page.waitForSelector(inputFileSelector, {
      timeout: 60000,
      state: "attached",
    });
    // console.log("input найден");

    // Устанавливаем файл
    await page.setInputFiles(inputFileSelector, tempFilePath);
    // const inputFileValue = await page.locator(inputFileSelector).inputValue();
    // console.log("Загружен файл:", inputFileValue);

    // Ждем, пока изображение обработается
    await page.waitForTimeout(5000); // Ожидание 5 секунд для обработки
    await page.waitForSelector("div[class='img-comparison-slider__second']", {
      timeout: 60000,
    });
    // console.log("Изображение обработано");
    await simulateMouseMovement(page);
    await page.waitForTimeout(2000); // Ожидание 5 секунд для обработки
    await simulateMouseMovement(page);
    // Ожидаем появления кнопки для скачивания
    const downloadButtonSelector = "button[id='processTask']";
    await page.waitForSelector(downloadButtonSelector, { timeout: 60000 });
    // console.log("processTask доступна");
    // Перехватываем событие скачивания
    const [download] = await Promise.all([page.waitForEvent("download"), page.click(downloadButtonSelector)]);
    await simulateMouseMovement(page);
    // Сохраняем файл на диск
    await download.saveAs(tempDownloadPath);
    // console.log(" изображение  с удаленным фоном сохранено");

    // Читаем файл как Buffer
    const processedImageBuffer = fs.readFileSync(tempDownloadPath);
    fs.unlinkSync(tempFilePath); // Удаляем временный файл с исходным изображением
    fs.unlinkSync(tempDownloadPath); // Удаляем временный файл с обработанным изображением

    // Возвращаем Buffer
    return processedImageBuffer;
  } catch (error) {
    // console.error("Ошибка при удалении фона:", error);
    throw error;
  }
};
