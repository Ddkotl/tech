import { client } from "../ai_client";

export const translateStorageAI = async (ai_model:string,text: string, fullName: string | undefined): Promise<string> => {
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
        Ты должен вернуть обьем внутреннего постоянного хранилища  устройства ${fullName},
        Если входного текста нет или недостаточно,  ответь прочерком -.
        Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"/|\<>*)
        Ответдолжен быть в формате : [число][единица измерения], если есть варианты [число][единица измерения]/[число][единица измерения]
        Примеры ответа: 8 МБ; 64 ГБ/32 ГБ`,
        },
      ],
      temperature: 0,
      model: ai_model,
    });
    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("translateStorageAI error", error);
    return "";
  }
};
