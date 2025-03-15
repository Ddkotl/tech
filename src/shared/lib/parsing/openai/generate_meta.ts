import { client, TEXT_AI_MODEL } from "./ai_client";

export const GenerateMetaTitle = async (title: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Отвечай на руском языке строго в указанном формате без добавления комментариев.",
        },
        {
          role: "user",
          content: `Ты профессиональный CEO специалист, занимаешься продвижением сайтов в топ поиска google. 
            Сделай мета заголок длиной 50 символов  для статьи на основе существующего .
    На выходе должен получиться заголовок на руском  для статьи блога максимальной длинной 50 символов.
            При ответе не добавляй свои комментарии, пояснения, символы(\`'"/|\<>) . Исходный заголовок: "${title}"`,
        },
      ],
      temperature: 0.5,
      model: TEXT_AI_MODEL,
    });

    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("GenerateMetaTitle error", error);
    return "";
  }
};

export const GenerateMetaDescription = async (
  text: string,
): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Отвечай строго в указанном формате без добавления комментариев.",
        },
        {
          role: "user",
          content: `Ты профессиональный CEO специалист, занимаешься продвижением сайтов в топ поиска google. 
              Сделай мета описание длиной 140 символов для статьи на основе существующего текста.
      На выходе должено получиться описание на руском  для статьи блога максимальной длинной 140 символов.
              При ответе не добавляй свои комментарии, пояснения, символы(\`'"/|\<>) . Исходный текст: "${text}"`,
        },
      ],
      temperature: 0.5,
      model: TEXT_AI_MODEL,
    });
    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("GenerateMetaDescription error", error);
    return "";
  }
};
