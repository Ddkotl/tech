import { Page } from "@playwright/test";

export const getModelsUrlByBrand = async (brandUrl: string, page: Page) => {
  const allModelsUrl = [];
  let currentPage: string | null = `https://www.gsmarena.com/${brandUrl}`;

  while (currentPage) {
    // Переход на текущую страницу
    await page.goto(currentPage, { waitUntil: "domcontentloaded" });

    // Локатор для всех моделей на странице
    const allModelsSinglePage = await page
      .locator(".makers > ul > li > a")
      .evaluateAll((elements) =>
        elements.map((e) => ({
          model: e.querySelector("strong")?.textContent as string,
          url: e.getAttribute("href") as string,
        })),
      );

    // Добавляем URL моделей в общий массив
    allModelsUrl.push(...allModelsSinglePage);

    // Поиск URL следующей страницы
    const nextPageUrl = await getNextPageUrl(page);
    if (!nextPageUrl) break; // Если нет следующей страницы, выходим из цикла

    currentPage = nextPageUrl;
  }

  return allModelsUrl;
};

/**
 * Функция для получения ссылки на следующую страницу бренда.
 */
export const getNextPageUrl = async (page: Page): Promise<string | null> => {
  const nextPageElement = page.locator(
    '.nav-pages a.prevnextbutton[title="Next page"]',
  );

  // Проверяем, есть ли кнопка "Next page" на странице
  if ((await nextPageElement.count()) === 0) {
    return null;
  }

  // Получаем ссылку
  const nextPageUrl = await nextPageElement.getAttribute("href");

  if (!nextPageUrl) {
    return null;
  }

  // Формируем полный URL
  const fullNextPageUrl = `https://www.gsmarena.com/${nextPageUrl}`;

  return fullNextPageUrl;
};
