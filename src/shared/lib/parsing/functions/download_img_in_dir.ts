import fs from "fs";
import path from "path";
import axios from "axios"; // или используйте node-fetch
import { convertToPNG } from "./image/convert_to_png";

/**
 * Сохраняет изображение по URL в указанную папку.
 * @param imageUrl - URL изображения.
 * @param outputDir - Папка, куда сохранить изображение.
 * @param fileName - Имя файла (по умолчанию: image_{timestamp}.png).
 */
export const saveImageFromUrl = async (imageUrl: string, outputDir: string, fileName?: string): Promise<string> => {
  try {
    // Создаем папку, если она не существует
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Генерируем имя файла, если оно не передано
    const imageName = fileName || `image_${Date.now()}.png`;
    const outputPath = path.join(outputDir, imageName);

    // Скачиваем изображение
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    });
    const contentType = response.headers["content-type"] || "application/octet-stream";

    const blob = new Blob([response.data], { type: contentType });

    // Создаем File из Blob (если имя файла известно)
    const file = new File([blob], imageUrl, { type: contentType });
    // Сохраняем изображение на диск

    const outFile = await convertToPNG(file);
    const arrayBuffer = await outFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(outputPath, buffer);

    console.log(`Изображение сохранено: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error("Ошибка при сохранении изображения:", error);
    throw error;
  }
};

// Пример использования
(async () => {
  try {
    const imageUrl = "https://fdn2.gsmarena.com/vv/bigpic/alcatel-v770.jpg"; // Замените на реальный URL
    const outputDir = "./img_for_test"; // Папка для сохранения
    const savedImagePath = await saveImageFromUrl(imageUrl, outputDir);
    console.log("Изображение сохранено по пути:", savedImagePath);
  } catch (error) {
    console.error("Ошибка:", error);
  }
})();
