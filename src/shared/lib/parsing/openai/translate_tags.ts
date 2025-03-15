import { client, TEXT_AI_MODEL } from "./ai_client";

export const translateTags = async (tags: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Отвечай на руском языке строго в указанном формате без добавления комментариев.",
        },
        {
          role: "user",
          content: ` Переведи данные тэги на русский язык, используя только строчные буквы. Оставь тэг без изменений , если он относится к следующим категориям:
- название марки (например, "samsung", "apple","oppo","nothing","lava","tecno"),
- модель устройства (например, "iphone", "galaxy","vivo"),
- операционная система (например, "android", "ios"),
а обычные слова/существительные переводи(например, "слухи", "анонс","обновление ПО").
Учитывай что это для сайта с телефонами и их обзорами и новостями.

Ответь строго строкой с результатами в формате: tag1, tag2, .... Если тэгов нет, то пустую строку "". Не добавляй комментарии,вопросы, пояснения, символы(\`'"/|\<>) или текст вне массива. Вот список тэгов: ${tags}`,
        },
      ],
      temperature: 0,
      model: TEXT_AI_MODEL,
    });

    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("translateTags error", error);
    return "";
  }
};
