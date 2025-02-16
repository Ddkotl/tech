import { translate } from "@vitalets/google-translate-api";
import { translateText } from "../openai/translate_text";
import { cleaneText } from "./cleane_text";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const safeTranslate = async (text: string) => {
  await sleep(500);
  try {
    const translatedByAi = await translateText(text);
    return cleaneText(translatedByAi);
  } catch (error) {
    console.error("Ошибка перевода:", error);
    return (await translate(text, { from: "en", to: "ru" })).text;
  }
};
