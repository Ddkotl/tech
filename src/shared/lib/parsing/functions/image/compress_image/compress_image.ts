import { restartTor } from "@/shared/lib/tor";
import { compressImageILoveImage } from "./compress_image_iloveimg";

export const сompressImageWithRetry = async (
  imageBuffer: Buffer,
  maxRetries: number = 5,
): Promise<Buffer> => {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      return await compressImageILoveImage(imageBuffer);
    } catch (error) {
      attempts++;
      console.error(
        `Ошибка при сжатии изображения (попытка ${attempts}):`,
        error,
      );

      if (attempts < maxRetries) {
        console.log("Перезапуск Tor и повторная попытка...");
        await restartTor();
      } else {
        throw new Error(
          "Не удалось сжать изображение после максимального количества попыток",
        );
      }
    }
  }

  return imageBuffer;
};
