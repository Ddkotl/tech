import { cleaneText } from "./cleane_text";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const safeTranslate = async (
  text: string,
  fullName: string,
  translateFunction: (text: string, fullName: string) => Promise<string>,
): Promise<string> => {
  await sleep(500);
  try {
    const translatedByAi = await translateFunction(text, fullName);
    return cleaneText(translatedByAi);
  } catch (error) {
    console.log("Ошибка перевода:", error);
    return "";
  }
};
