import { client, TEXT_AI_MODEL } from "../ai_client";

export const translateReleaseDateAI = async (
  text: string,
  fullName: string,
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
        Ты должен вернуть дату релиза устройства ${fullName},
        Если входного текста нет или недостаточно, возьми данные из интернета.
        Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"/|\<>*)
        Ответдолжен быть в формате : [год],[месяц или квартал]
        Примеры: 2018 г, 3-й квартал; 2020 г, июль`,
        },
      ],
      temperature: 0,
      model: TEXT_AI_MODEL,
    });
    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("translateReleaseDateAI error", error);
    return "";
  }
};
