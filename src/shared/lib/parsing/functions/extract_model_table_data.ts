import { Page } from "@playwright/test";

export const extractTableData = async (sectionName: string, page: Page) => {
  const data: Record<string, string> = {};
  const rows = await page
    .locator(`//th[contains(text(), "${sectionName}")]//ancestor::table[1]//tr`)
    .all();

  for (const row of rows) {
    const key = await row
      .locator(".ttl")
      .innerText()
      .catch(() => null);
    const value = await row
      .locator(".nfo")
      .innerText()
      .catch(() => null);

    if (key && value) {
      data[key.trim()] = value.trim();
    }
  }

  return data;
};
