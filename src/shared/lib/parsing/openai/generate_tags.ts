import { client, TEXT_AI_MODEL } from "./ai_client";

export const generateTags = async (text: string): Promise<string | null> => {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: ` сгенерируй 2-3 тэга для моей статьи  блога на основе текста. Тэг должен состоять из 1-2 слов. Например фирма модель или система.
- название марки (например, "samsung", "apple","oppo","nothing","lava","tecno"),
- модель устройства (например, "iphone", "galaxy","vivo"),
- операционная система (например, "android", "ios"),
Ответь строго массивом с результатами в формате: ["tag1", "tag2"]. 
Не добавляй комментарии,вопросы, пояснения, символы(\`'"/|\<>) или текст вне массива.
 Вот текст статьи: ${text}`,
      },
    ],
    temperature: 0,
    model: TEXT_AI_MODEL,
  });

  return chatCompletion.choices[0].message.content
    ? chatCompletion.choices[0].message.content
    : "";
};
