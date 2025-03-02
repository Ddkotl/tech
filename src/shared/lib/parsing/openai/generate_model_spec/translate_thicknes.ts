import { client, TEXT_AI_MODEL } from "../ai_client";

export const translateThicknesAI = async (
  text: string,
  fullName: string | undefined,
): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Отвечай строго в  формате строки,  без добавления комментариев.",
        },
        {
          role: "user",
          content: `Переведи данный текст на руский язык:
        text: ${text}.
        Ты должен вернуть толщину  устройства ${fullName},
        Если входного текста нет или недостаточно, возьми данные из интернета.
        Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"/|\<>*)
        Ответдолжен быть в формате : [толщина][мм]
        Примеры ответа: 9 мм; 7.8 мм`,
        },
      ],
      temperature: 0,
      model: TEXT_AI_MODEL,
    });
    return chatCompletion.choices[0].message.content
      ? chatCompletion.choices[0].message.content.replace(/[^0-9.]/g, "")
      : "";
  } catch (error) {
    console.log("translateThicknesAI error", error);
    return "";
  }
};
