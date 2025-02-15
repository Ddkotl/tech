import { translate } from "@vitalets/google-translate-api";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const safeTranslate = async (text: string) => {
  await sleep(1500); // 1.5 секунды паузы между запросами
  try {
    return (await translate(text, { from: "en", to: "ru" })).text;
  } catch (error) {
    console.error("Ошибка перевода:", error);
    return text; // Если ошибка, вернуть оригинальный текст
  }
};
