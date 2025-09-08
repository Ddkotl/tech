import { client } from "./ai_client";

export const translateText = async (ai_model: string, text: string): Promise<string> => {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Отвечай на руском языке строго в  формате строки,  без добавления комментариев.",
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
    model: ai_model,
  });
  return chatCompletion.choices[0].message.content as string;
};
