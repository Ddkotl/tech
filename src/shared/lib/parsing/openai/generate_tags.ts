import { client } from "./ai_client";

export const generateTags = async (text: string): Promise<string | null> => {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Отвечай строго в указанном формате без добавления комментариев.",
      },
      {
        role: "user",
        content: ` сгенерируй 2-3 тэга для моей статьи  блога на основе текста. Тэг должен состоять из 1-2 слов. Например фирма модель или система.

Ответь строго массивом с результатами в формате: ["tag1", "tag2"]. 
Не добавляй комментарии,вопросы, пояснения, символы(\`'"/|\<>) или текст вне массива.
 Вот текст статьи: ${text}`,
      },
    ],
    temperature: 0,
    model: "gpt-4",
  });

  return chatCompletion.choices[0].message.content
    ? chatCompletion.choices[0].message.content
    : "";
};
