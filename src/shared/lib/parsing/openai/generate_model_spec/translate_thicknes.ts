import { client } from "../ai_client";

export const translateThicknesAI = async (ai_model:string,text: string, fullName: string | undefined): Promise<string> => {
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
        Исходный текст: ${text}.
        Ты должен вернуть строку с толщиной  устройства ${fullName}, исходя из исходного текста,
        Если входного текста нет или недостаточно,  ответь прочерком -.
        Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"/|\<>*)
        Ответдолжен быть в формате : [толщина][мм]
        Примеры ответа: 9 мм; 7.8 мм`,
        },
      ],
      temperature: 0,
      model: ai_model,
    });
    return chatCompletion.choices[0].message.content
      ? chatCompletion.choices[0].message.content.replace(/[^0-9.]/g, "")
      : "";
  } catch (error) {
    console.log("translateThicknesAI error", error);
    return "";
  }
};
