import { client } from "./ai_client";

export const GenerateMetaTitle = async (ai_model: string, title: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Ты SEO-специалист с экспертизой в создании мета-заголовков для Google.
            Строго соблюдай требования:
            - Формат: только чистый текст без кавычек и дополнительных символов
            - Длина: точно 50 символов (±2 символа)
            - Язык: русский
            - Стиль: продающий, цепляющий, с элементами кликбейта
            - Запрещены: эмодзи, спецсимволы, HTML-теги, markdown
            - Фокус: включи главные ключевые слова из исходного заголовка`,
        },
        {
          role: "user",
          content: `Исходный заголовок: "${title}"`,
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

export const GenerateMetaDescription = async (text: string): Promise<string> => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Ты профессиональный SEO-копирайтер.
            Строго соблюдай правила:
            - Формат: чистый текст без кавычек и лишних символов
            - Длина: точно 140 символов (±5 символов)
            - Язык: русский
            - Тон: профессиональный но привлекательный
            - Обязательно: включи призыв к действию и основные ключевые слова
            - Запрещены: эмодзи, HTML-теги, markdown, упоминания бренда
            - Структура: проблема-решение-призыв к действию`,
        },
        {
          role: "user",
          content: `Исходный текст: "${text}"`,
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
