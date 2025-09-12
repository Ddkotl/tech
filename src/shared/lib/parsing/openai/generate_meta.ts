import { client } from "./ai_client";

export const GenerateMetaTitle = async (ai_model: string, title: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Отвечай на русcком языке  строго в  формате строки ,  без добавления комментариев.",
        },
        {
          role: "user",
          content: `Сгенерируй заголовок новости так, чтобы он звучал естественно для русскоязычного читателя.
Ответь строго строкой.
Не добавляй комментарии,вопросы, пояснения, символы(\`'"/|\<>)
Вот текст из которого нужно брать информацию для генерации:
${text}`,
        },
      ],
      temperature: 0.5,
      model: ai_model,
      max_tokens: 60,
    });

    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("GenerateMetaTitle error", error);
    return "";
  }
};

export const GenerateMetaDescription = async (ai_model:string,text: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Отвечай на русcком языке  строго в  формате строки ,  без добавления комментариев.",
        },
        {
          role: "user",
          content:  `Сгенерируй описание новости так, чтобы он звучал естественно для русскоязычного читателя.
Ответь строго строкой.
Не добавляй комментарии,вопросы, пояснения, символы(\`'"/|\<>)
Вот текст из которого нужно брать информацию для генерации:
${text}`,
        },
      ],
      temperature: 0.5,
      model: ai_model,
      max_tokens: 150
    });
    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.log("GenerateMetaDescription error", error);
    return "";
  }
};
