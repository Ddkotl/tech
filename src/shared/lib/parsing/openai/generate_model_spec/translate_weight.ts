import { client, TEXT_AI_MODEL } from "../ai_client";

export const translateWeightAI = async (text: string, fullName: string | undefined): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Отвечай строго в  формате строки,  без добавления комментариев.",
        },
        {
          role: "user",
          content: `
        исходный текст: ${text}.
        Ты должен вернуть строку с весом  устройства ${fullName}, исходя из исходного текста ,
        Если исходного текста нет или недостаточно,  ответь прочерком -.
        Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"/|\<>*)
        Ответдолжен быть в формате : [вес][г]
        Примеры ответа: 13 г; 200 г`,
        },
      ],
      temperature: 0,
      model: TEXT_AI_MODEL,
    });
    return chatCompletion.choices[0].message.content
      ? chatCompletion.choices[0].message.content.replace(/[^0-9.]/g, "")
      : "";
  } catch (error) {
    console.log("translateWeightAI error", error);
    return "";
  }
};
