import { client, TEXT_AI_MODEL } from "./ai_client";

export const translateText = async (text: string): Promise<string> => {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Отвечай на руском языке строго в  формате строки,  без добавления комментариев.",
      },
      {
        role: "user",
        content: `Переведи данный текст на руский язык:
        text: ${text}.
        Если входного текста нет верни -.
        Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"/|\<>*)`,
      },
    ],
    temperature: 0,
    model: TEXT_AI_MODEL,
  });
  return chatCompletion.choices[0].message.content as string;
};
