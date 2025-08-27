import sharp from "sharp";
import cv from "@techstark/opencv-js";

/**
 * Удаляет фон изображения, определяя контур телефона.
 * @param file - Входной файл изображения.
 * @param options - Опции для обработки.
 * @returns Promise<File> - PNG с прозрачным фоном.
 */
export const convertToPNG = async (file: File, options: { resizeWidth?: number } = {}): Promise<File> => {
  const { resizeWidth = 300 } = options;

  try {
    if (!file.type.startsWith("image/")) {
      throw new Error("Файл не является изображением");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Загружаем изображение через sharp
    const { data, info } = await sharp(buffer)
      .ensureAlpha()
      .resize(resizeWidth)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // console.log("Информация о изображении:", info);

    // Создаем матрицу OpenCV
    const src = new cv.Mat(info.height, info.width, cv.CV_8UC4);
    src.data.set(data);

    // Преобразуем в градации серого
    // console.log("Преобразуем в градации серого...");
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // Применяем адаптивный порог для выделения объекта
    // console.log("Применяем пороговую обработку...");
    const binary = new cv.Mat();
    cv.adaptiveThreshold(gray, binary, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, 11, 2);

    // Находим контуры
    // console.log("Находим контуры...");
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(binary, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    // Определяем самый большой контур
    // console.log("Ищем самый большой контур...");
    let maxArea = 0;
    let bestContour = null;
    for (let i = 0; i < contours.size(); i++) {
      const area = cv.contourArea(contours.get(i));
      if (area > maxArea) {
        maxArea = area;
        bestContour = contours.get(i);
      }
    }

    if (!bestContour) {
      throw new Error("Не удалось найти контур телефона.");
    }

    // Создаем маску
    // console.log("Создаем маску...");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const mask = new cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC1);
    const matVector = new cv.MatVector();
    matVector.push_back(bestContour);
    cv.drawContours(mask, matVector, -1, new cv.Scalar(255), -1);

    // 🔹 Расширяем контур, чтобы не обрезало края
    // console.log("Расширяем контур...");
    const kernel = cv.Mat.ones(5, 5, cv.CV_8U); // Увеличиваем размер
    cv.dilate(mask, mask, kernel);

    // 🔹 Размытие маски для плавного перехода
    // console.log("Сглаживаем края...");
    cv.GaussianBlur(mask, mask, new cv.Size(15, 15), 2);

    // 🔹 Используем boundingRect, чтобы скорректировать кропинг
    // console.log("Корректируем границы...");
    const boundingRect = cv.boundingRect(bestContour);
    boundingRect.x = Math.max(0, boundingRect.x - 5);
    boundingRect.y = Math.max(0, boundingRect.y - 5);
    boundingRect.width = Math.min(mask.cols - boundingRect.x, boundingRect.width + 15);
    boundingRect.height = Math.min(mask.rows - boundingRect.y, boundingRect.height + 20);

    // 🔹 Применяем маску к альфа-каналу
    // console.log("Применяем маску к альфа-каналу...");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const alpha = new cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC1);
    mask.copyTo(alpha);

    // Собираем окончательное изображение (RGBA)
    // console.log("Собираем окончательное изображение...");
    const rgba = new cv.Mat();
    const rgbaChannels = new cv.MatVector();
    const rgbChannels = new cv.MatVector();
    cv.split(src, rgbChannels);

    rgbaChannels.push_back(rgbChannels.get(0)); // R
    rgbaChannels.push_back(rgbChannels.get(1)); // G
    rgbaChannels.push_back(rgbChannels.get(2)); // B
    rgbaChannels.push_back(alpha); // A (прозрачность)

    cv.merge(rgbaChannels, rgba);

    // Конвертируем результат обратно в PNG
    // console.log("Конвертируем в PNG...");
    const pngBuffer = await sharp(Buffer.from(rgba.data), {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4,
      },
    })
      .png()
      .toBuffer();

    // Очистка памяти
    src.delete();
    gray.delete();
    binary.delete();
    mask.delete();
    bestContour?.delete();
    contours.delete();
    hierarchy.delete();
    alpha.delete();
    rgba.delete();
    rgbaChannels.delete();
    rgbChannels.delete();

    return new File([new Blob([new Uint8Array(pngBuffer)])], file.name.replace(/\.[^.]+$/, ".png"), {
      type: "image/png",
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Ошибка при обработке изображения:", error);
    throw new Error(`Ошибка при конвертации изображения: ${error}`);
  }
};
