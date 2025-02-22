import { client, IMAGE_AI_MODEL } from "./ai_client";
import fs from "fs";
export const EditImage = async (
  imagePath: string, // Путь к исходному изображению (или base64)
): Promise<string> => {
  try {
    const image = await fs.promises.readFile(imagePath, {
      encoding: "base64",
    });
    // Преобразование base64 в Buffer
    const imageBuffer = Buffer.from(image, "base64");

    // Создание объекта File из Buffer
    const imageFile = new File([imageBuffer], "image.png", {
      type: "image/png",
      lastModified: Date.now(), // Добавляем обязательное свойство lastModified
    });
    const chatCompletion = await client.images.edit({
      image: imageFile, // Исходное изображение
      prompt:
        "Не меняй исходное изображение, удали белый фон(сделай его прозрачным), улучши качество", // Описание изменений
      model: IMAGE_AI_MODEL,
      response_format: "url", // Формат ответа
    });

    return chatCompletion.data[0].url ? chatCompletion.data[0].url : "";
  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};

(async () => {
  try {
    const imageUrl = await EditImage("img_for_test/image_1740218268067.png");
    console.log("Edited Image URL:", imageUrl);
  } catch (error) {
    console.error("Error in IIFE:", error);
  }
})();
