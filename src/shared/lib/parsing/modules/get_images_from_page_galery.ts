import { Page } from "@playwright/test";

export const getImagesFromPageGallery = async (page: Page): Promise<string[]> => {
  const imgUrlList: string[] = [];
  const imgGalleryFirstLinkLocator: string = "div.article-info a[href*='pictures']"; // Локатор для ссылки на галерею
  const imgLocator: string = "div.gallery-misc-slides img"; // Локатор для изображений в галерее
  const nextButtonLocator: string = "a.next"; // Локатор для кнопки "Следующая"

  try {
    // Переход на страницу галереи
    const imgGalleryLink = await page.locator(imgGalleryFirstLinkLocator).first();
    await imgGalleryLink.click();

    // Ожидание загрузки галереи
    await page.waitForSelector(imgLocator, { state: "visible" });

    // Получение первого изображения для маркировки
    const firstImage = await page.locator(imgLocator).first();
    const firstImageSrc = await firstImage.getAttribute("src");
    if (!firstImageSrc) {
      throw new Error("Не удалось получить первое изображение");
    }

    // Добавляем первое изображение в список
    imgUrlList.push(firstImageSrc);

    // Сбор изображений
    let isFirstImageRepeated = false;
    while (!isFirstImageRepeated) {
      // Переход к следующему изображению
      const nextButton = await page.locator(nextButtonLocator).first();
      await nextButton.click();
      await page.waitForTimeout(1000); // Ожидание подгрузки следующего изображения

      // Получение текущего изображения
      const currentImage = await page.locator(imgLocator).first();
      const currentImageSrc = await currentImage.getAttribute("src");

      // Проверка, не вернулись ли мы к первому изображению
      if (currentImageSrc === firstImageSrc) {
        isFirstImageRepeated = true; // Прекращаем цикл, если вернулись к первому изображению
      } else if (currentImageSrc && !imgUrlList.includes(currentImageSrc)) {
        imgUrlList.push(currentImageSrc); // Добавляем новое изображение в список
      }
    }

    return imgUrlList;
  } catch (e) {
    console.log("Не удалось получить картинки из галереи:", e);
    return [];
  }
};
