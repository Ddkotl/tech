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
          content: `Переведи данный текст на руский язык:
        text: ${text}.
        Ты должен вернуть вес  устройства ${fullName},
        Если входного текста нет или недостаточно, возьми данные из интернета.
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
