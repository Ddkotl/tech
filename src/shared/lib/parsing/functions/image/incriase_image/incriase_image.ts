import { restartTor } from "@/shared/lib/tor";
import { incriaseImageILoveImage } from "./incriase_image_iloveimg";

export const incriaseImageWithRetry = async (
  imageBuffer: Buffer,
  maxRetries: number = 5,
): Promise<Buffer> => {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      return await incriaseImageILoveImage(imageBuffer);
    } catch (error) {
      attempts++;
      console.error(
        `Ошибка при увеличении изображения (попытка ${attempts}):`,
        error,
      );

      if (attempts < maxRetries) {
        console.log("Перезапуск Tor и повторная попытка...");
        await restartTor();
      } else {
        throw new Error(
          "Не удалось увеличить изображение после максимального количества попыток",
        );
      }
    }
  }

  return imageBuffer;
};
