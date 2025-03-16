import path from "path";
import { Browser, chromium } from "playwright";
import fs from "fs";
import os from "os";
import { simulateMouseMovement } from "../simulate_mouse_move";
import { addHTTPheaders } from "../addHTTPheaders";

/**
 * Удаляет фон с изображения через сайт https://www.photiu.ai/ с использованием Playwright,
 * при этом входное изображение передается в виде Buffer.
 * @param imageBuffer - Изображение в виде Buffer.
 * @returns Buffer с изображением без фона.
 */
export const removeBackgroundWithphotiu = async (
  imageBuffer: Buffer,
): Promise<Buffer> => {
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--disable-infobars",
        `--timezone="America/New_York"`,
        "--lang=en-US",
      ],
    });

    const page = await addHTTPheaders(browser);
    // Создаем временный файл из Buffer
    const tempFilePath = path.join(os.tmpdir(), "input_image.png");
    fs.writeFileSync(tempFilePath, imageBuffer);

    // Открываем сайт
    // console.log("Открываем сайт...");
    await page.goto("https://www.photiu.ai/background-remover");
    // console.log("Сайт открыт");
    await page.waitForTimeout(1000);
    await simulateMouseMovement(page);
    const cookiebutton = 'button[id="CybotCookiebotDialogBodyButtonDecline"]';
    await page.waitForSelector(cookiebutton, {
      timeout: 60000,
      state: "visible",
    });
    await simulateMouseMovement(page);
    await page.click(cookiebutton);
    // Загружаем изображение на сайт
    const inputFileSelector = 'input[type="file"]';
    await page.waitForSelector(inputFileSelector, {
      timeout: 60000,
      state: "attached",
    });
    await page.setInputFiles(inputFileSelector, tempFilePath);
    // console.log("Изображение загружено");
    await page.waitForTimeout(5000);
    // Ждем, пока изображение обработается
    // await page.waitForSelector("div[class='transform-gpu']", {
    //   timeout: 60000,
    //   state: "attached",
    // });
    // console.log("Изображение обработано");
    // await page.screenshot({ path: "./img_for_test/1.png" });
    // Ждем, пока появится кнопка для скачивания
    const downloadButtonSelector = "button[id='Download HD free']";
    await page.waitForSelector(downloadButtonSelector, { timeout: 60000 });
    await simulateMouseMovement(page);
    // Перехватываем событие скачивания
    const [download] = await Promise.all([
      page.waitForEvent("download"), // Ждем события скачивания
      page.click(downloadButtonSelector), // Кликаем по кнопке для скачивания
    ]);

    // Определяем временный путь для скачивания
    const tempDownloadPath = path.join(os.tmpdir(), "processed_image.png");

    // Сохраняем файл на диск
    await download.saveAs(tempDownloadPath);
    // await download.saveAs(`./img_for_test/test-${new Date()}.png`);

    // console.log("Изображение без фона сохранено");

    // Читаем файл как Buffer
    const processedImageBuffer = fs.readFileSync(tempDownloadPath);

    // console.log("Изображение без фона получено как Buffer");
    fs.unlinkSync(tempFilePath); // Удаляем временный файл с исходным изображением
    fs.unlinkSync(tempDownloadPath); // Удаляем временный файл с обработанным изображением
    // Возвращаем Buffer
    return processedImageBuffer;
  } catch (error) {
    console.error("Ошибка при удалении фона:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
