import { client } from "./ai_client";

export const translateAndUnicTitle = async (ai_model:string,text: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Отвечай на руском языке строго в указанном формате без добавления комментариев.",
        },
        {
          role: "user",
          content: `Я написал заголовок для блога. Переведи данный заголовок на русский язык, сохраняя смысл, но изменяя стиль на более креативный и выразительный. 
        Не  изменяй и не переводи слова, если они относится к следующим категориям:
- название марки (например, "samsung", "apple"),
- модель устройства (например, "iphone 15", "galaxy s22"),
- операционная система (например, "android", "ios"),
Перевод не должен быть дословным, на выходе должен получиться заголовок для статьи блога . Максимальная длянна 15 слов.
        Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"/|\<>*) . Текст: "${text}"`,
        },
      ],
      temperature: 0.5,
      model: ai_model,
    });
    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("translateAndUnicTitle error", error);
    return "";
  }
};
