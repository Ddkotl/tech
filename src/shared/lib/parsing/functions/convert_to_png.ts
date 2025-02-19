import sharp from "sharp";

// Функция для конвертации изображения в формат PNG
export const convertToPNG = async (imageBuffer: Buffer): Promise<Buffer> => {
  try {
    // Конвертируем изображение в PNG
    const pngBuffer = await sharp(imageBuffer)
      .toFormat("png") // Указываем формат PNG
      .toBuffer(); // Получаем буфер изображения
    return pngBuffer;
  } catch (error) {
    console.error("Ошибка при конвертации в PNG:", error);
    throw new Error("Ошибка при конвертации изображения в PNG");
  }
};
