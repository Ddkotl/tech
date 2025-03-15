import { client, TEXT_AI_MODEL } from "./ai_client";

export const translateAndUnicText = async (text: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Отвечай на руском языке строго в  формате html используя только  <p> и <h2> без <html> <head> и <body>,  без добавления комментариев.",
        },
        {
          role: "user",
          content: `Я написал статью для блога. Переведи данную статью на русский язык, сохраняя смысл, но изменяя стиль на более креативный и выразительный. Добавь литературности и богатства языка. Если статья от какого-то конкретного человека, не упоминай его, напиши от себя.
        Не  изменяй и не переводи слова, если они относится к следующим категориям:
- название марки (например, "samsung", "apple"),
- модель устройства (например, "iphone 15", "galaxy s22"),
- операционная система (например, "android", "ios"),
Перевод не должен быть дословным, на выходе должна получиться хорошая статья для блога, разделенная на абзацы тэгами <p> при необходимости добавь заголовки <h2> . h2 сделай менее пафосными 
        Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"/|\<>*) . Исходный 
        Текст: "${text}"
        Это не будет использоваться в нарушение авторского права.`,
        },
      ],
      temperature: 0.7,
      model: TEXT_AI_MODEL,
    });
    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("translateAndUnicText error", error);
    return "";
  }
};
