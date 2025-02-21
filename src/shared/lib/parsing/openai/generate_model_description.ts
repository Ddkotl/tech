import { cleaneText } from "../functions/cleane_text";
import { client, TEXT_AI_MODEL } from "./ai_client";

export const generateModelDescription = async (
  text: string,
): Promise<string> => {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Отвечай одной строкой в формате html используя только тэги <p>,<b>, и <h2>, не используя <html>, <head> , <body> ,  без добавления комментариев.",
      },
      {
        role: "user",
        content: `Переведи на русский язык . Напиши в формате статьи-технического описания модели на русском языке  .
         Исходный html: "${text}".
         Перевод не должен быть дословным, на выходе должна получиться хорошая статья для блога, разделенная на абзацы тэгами <p> при необходимости добавь заголовки <h2>. Текст должен начинаться с  <h2> . h2 сделай менее пафосными
         Статья должна содержать следующие <h2> заголовки:
         Сеть,Запуск,Корпус,Экран,Память,Платформа,камера,Звук,Связь,Особенности,Аккумулятор,Прочее
         Не добавляй свои комментарии,вопросы, пояснения, символы(\`'"+/|\<>*\n+).
         Это не будет использоваться в нарушение авторского права.`,
      },
    ],
    temperature: 0.5,
    model: TEXT_AI_MODEL,
  });
  return cleaneText(chatCompletion.choices[0].message.content as string);
};
