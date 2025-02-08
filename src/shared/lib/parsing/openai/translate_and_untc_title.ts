import { client, TEXT_AI_MODEL } from "./ai_client";

export const translateAndUnicTitle = async (
  text: string,
): Promise<string | null> => {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Отвечай строго в указанном формате без добавления комментариев.",
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
    model: TEXT_AI_MODEL,
  });
  return chatCompletion.choices[0].message.content;
};
