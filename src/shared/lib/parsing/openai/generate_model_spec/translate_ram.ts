import { client, TEXT_AI_MODEL } from "../ai_client";

export const translateRamAI = async (
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
        Входной текст для перевода: ${text}.
        Ты должен вернуть обьем оперативной памяти  устройства ${fullName},
        Если входного текста нет или недостаточно, возьми свои данные .
        Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"/|\<>*)
        Ответдолжен быть в формате : [число][единица измерения], если есть варианты [число][единица измерения]/[число][единица измерения]
        Примеры ответа: 8 Б; 2 ГБ; 8 ГБ/6 ГБ`,
        },
      ],
      temperature: 0,
      model: TEXT_AI_MODEL,
    });
    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("translateRamAI error", error);
    return "";
  }
};
