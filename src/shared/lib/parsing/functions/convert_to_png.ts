import sharp from "sharp";
import cv from "@techstark/opencv-js";

/**
 * Удаляет фон изображения, определяя контур телефона.
 * @param file - Входной файл изображения.
 * @param options - Опции для обработки.
 * @returns Promise<File> - PNG с прозрачным фоном.
 */
export const convertToPNG = async (
  file: File,
  options: { resizeWidth?: number } = {},
): Promise<File> => {
  const { resizeWidth = 300 } = options;

  try {
    // Проверка, что файл является изображением
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

    console.log("Информация о изображении:", info);

    const src = new cv.Mat(info.height, info.width, cv.CV_8UC4);
    src.data.set(data);

    // Преобразуем в градации серого
    console.log("Преобразуем в градации серого...");
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // Применяем Canny для выделения границ
    console.log("Применяем Canny для выделения границ...");
    const edges = new cv.Mat();
    cv.Canny(gray, edges, 50, 150);

    // Увеличиваем толщину границ (морфология)
    console.log("Увеличиваем толщину границ...");
    const kernel = cv.Mat.ones(5, 5, cv.CV_8U);
    cv.dilate(edges, edges, kernel);

    // Находим контуры
    console.log("Находим контуры...");
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(
      edges,
      contours,
      hierarchy,
      cv.RETR_EXTERNAL,
      cv.CHAIN_APPROX_SIMPLE,
    );

    // Определяем самый большой контур (предполагаемый телефон)
    console.log("Ищем самый большой контур...");
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

    // Создаем маску на основе контура телефона
    console.log("Создаем маску...");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const mask = new cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC1);
    const matVector = new cv.MatVector();
    matVector.push_back(bestContour);

    // Рисуем контур (предполагается, что bestContour — это корректный контур)
    console.log("Рисуем контур...");
    cv.drawContours(mask, matVector, -1, new cv.Scalar(1), -1);
    console.log("Размеры изображения:", src.rows, src.cols);
    console.log("Размеры маски:", mask.rows, mask.cols);
    // Применяем GrabCut для точного выделения объекта
    console.log("Применяем GrabCut...");
    const bgdModel = new cv.Mat();
    const fgdModel = new cv.Mat();
    const rect = new cv.Rect(1, 1, src.cols - 2, src.rows - 2);
    console.log("Размеры прямоугольника:", rect.width, rect.height);
    console.log("Проверка маски перед GrabCut:", mask.data);
    try {
      cv.grabCut(src, mask, rect, bgdModel, fgdModel, 5, cv.GC_INIT_WITH_MASK);
    } catch (error) {
      console.error("Ошибка при вызове GrabCut:", error);
      throw new Error(`Ошибка при вызове GrabCut: ${error}`);
    }

    // Обновляем маску: телефон (foreground) оставляем, фон удаляем
    console.log("Обновляем маску...");
    const fgMask = new cv.Mat();
    cv.threshold(mask, fgMask, 2, 255, cv.THRESH_BINARY);

    // Применяем маску к альфа-каналу
    console.log("Применяем маску к альфа-каналу...");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const alpha = new cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC1);
    fgMask.copyTo(alpha);

    // Собираем окончательное изображение (RGBA)
    console.log("Собираем окончательное изображение...");
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
    console.log("Конвертируем в PNG...");
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
    edges.delete();
    mask.delete();
    fgMask.delete();
    bestContour?.delete();
    contours.delete();
    hierarchy.delete();
    kernel.delete();
    bgdModel.delete();
    fgdModel.delete();
    alpha.delete();
    rgba.delete();
    rgbaChannels.delete();
    rgbChannels.delete();

    return new File([pngBuffer], file.name.replace(/\.[^.]+$/, ".png"), {
      type: "image/png",
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Ошибка при обработке изображения:", error);
    throw new Error(`Ошибка при конвертации изображения: ${error}`);
  }
};
