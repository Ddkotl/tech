import sharp from "sharp";
import cv from "@techstark/opencv-js";

/**
 * Конвертирует изображение в PNG и удаляет белый фон.
 * @param file - Входной файл изображения.
 * @param options - Опции для настройки обработки изображения.
 * @returns Promise<File> - Обработанный файл в формате PNG.
 */
export const convertToPNG = async (
  file: File,
  options: {
    resizeWidth?: number; // Ширина для ресайза (опционально)
    lowThreshold?: [number, number, number, number]; // Нижний порог для белого цвета
    highThreshold?: [number, number, number, number]; // Верхний порог для белого цвета
  } = {},
): Promise<File> => {
  const {
    resizeWidth = 300, // Значение по умолчанию
    lowThreshold = [200, 200, 200, 255], // Нижний порог по умолчанию
    highThreshold = [255, 255, 255, 255], // Верхний порог по умолчанию
  } = options;

  try {
    // Читаем содержимое файла
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Загружаем изображение через sharp в RGB
    const { data, info } = await sharp(buffer)
      .ensureAlpha() // Добавляем альфа-канал
      .resize(resizeWidth) // Ресайз (опционально)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Создаём матрицу OpenCV из буфера
    const src = new cv.Mat(info.height, info.width, cv.CV_8UC4);
    src.data.set(data);

    // Создаём маску для белого цвета
    const mask = new cv.Mat();
    const low = new cv.Mat(src.rows, src.cols, src.type(), lowThreshold);
    const high = new cv.Mat(src.rows, src.cols, src.type(), highThreshold);

    cv.inRange(src, low, high, mask); // Создаём маску белого фона
    cv.bitwise_not(mask, mask); // Инвертируем маску (фон → прозрачный)

    // Применяем маску к изображению
    const dst = new cv.Mat();
    src.copyTo(dst, mask);

    // Конвертируем результат обратно в PNG
    const pngBuffer = await sharp(Buffer.from(dst.data), {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      },
    })
      .png()
      .toBuffer();

    // Освобождаем память
    src.delete();
    mask.delete();
    low.delete();
    high.delete();
    dst.delete();

    // Создаём новый файл
    return new File([pngBuffer], file.name.replace(/\.[^.]+$/, ".png"), {
      type: "image/png",
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Ошибка при обработке изображения:", error);
    throw new Error(`Ошибка при конвертации изображения: ${error}`);
  }
};
