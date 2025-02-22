import path from "path";
import { chromium } from "playwright";

/**
 * Удаляет фон с изображения через сайт carve.photos с использованием Playwright.
 * @param imagePath - Путь к локальному изображению.
 * @param outputDir - Папка для сохранения обработанного изображения.
 * @returns Путь к обработанному изображению.
 */
export const removeBackgroundWithCarve = async (
  imagePath: string,
  outputDir: string,
): Promise<string> => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    // Открываем сайт
    console.log("Открываем сайт...");
    await page.goto("https://carve.photos/");
    console.log("Сайт открыт");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "./img_for_test/screen/screenshot.png" });

    // Загружаем изображение на сайт
    const inputFileSelector = 'input[type="file"]';
    await page.setInputFiles(inputFileSelector, imagePath);
    console.log("Изображение загружено");

    // Ждем, пока изображение обработается
    await page.waitForSelector("img[alt='изображение без фона']", {
      timeout: 60000,
    });
    await page.waitForFunction(
      () => {
        const imgElement = document.querySelector(
          "img[alt='изображение без фона']",
        ) as HTMLImageElement;
        return imgElement?.src.startsWith("blob:");
      },
      { timeout: 60000 },
    );
    console.log("Изображение обработано");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "./img_for_test/screen/screenshot1.png" });
    // Ждем, пока появится кнопка для скачивания
    const downloadButtonSelector = "button.download-button.secondary";
    await page.waitForSelector(downloadButtonSelector, { timeout: 60000 });

    // Перехватываем событие скачивания
    const [download] = await Promise.all([
      page.waitForEvent("download"), // Ждем события скачивания
      page.click(downloadButtonSelector), // Кликаем по кнопке для скачивания
    ]);

    // Определяем путь для сохранения файла
    const tempFilePath = path.join(
      outputDir,
      `processed_${path.basename(imagePath)}`,
    );

    // Сохраняем файл на диск
    await download.saveAs(tempFilePath);

    console.log(`Изображение без фона сохранено: ${tempFilePath}`);
    return tempFilePath;
  } catch (error) {
    console.error("Ошибка при удалении фона:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

// Пример использования
(async () => {
  try {
    const imagePath = "./img_for_test/image_1740218268067.png"; // Путь к изображению
    const outputDir = "./img_for_test"; // Папка для сохранения

    // Удаляем фон изображения
    const processedImagePath = await removeBackgroundWithCarve(
      imagePath,
      outputDir,
    );
    console.log("Обработанное изображение без фона:", processedImagePath);
  } catch (error) {
    console.error("Ошибка:", error);
  }
})();
