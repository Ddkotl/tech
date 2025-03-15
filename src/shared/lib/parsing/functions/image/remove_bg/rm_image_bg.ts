import { restartTor } from "@/shared/lib/tor";
import { removeBgImageILoveImage } from "./remove_bg_iloveimg";
import { removeBackgroundWithCarve } from "./remove_bg_sait_cave";
import { removeBackgroundWithphotiu } from "./remove_bg_sait_photiu";

export const removeImageBackgroundWithRetry = async (
  imageBuffer: Buffer,
  maxRetries: number = 5,
): Promise<Buffer> => {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      // Попытка удалить фон через Photiu
      return await removeBackgroundWithphotiu(imageBuffer);
    } catch (errorILoveImage) {
      console.log(
        `Ошибка при удалении фона с помощью removeBackgroundWithphotiu (попытка ${attempts + 1}):`,
        errorILoveImage,
      );
      try {
        return await removeBgImageILoveImage(imageBuffer);
      } catch (errorPhotiu) {
        console.log(
          `Ошибка при удалении фона с помощью removeBgImageILoveImage (попытка ${attempts + 1}):`,
          errorPhotiu,
        );

        try {
          // Попытка удалить фон через Carve
          return await removeBackgroundWithCarve(imageBuffer);
        } catch (errorCarve) {
          console.log(
            `Ошибка при удалении фона с помощью removeBackgroundWithCarve (попытка ${attempts + 1}):`,
            errorCarve,
          );
        }
      }
    }

    attempts++;
    if (attempts < maxRetries) {
      console.log("Перезапуск Tor и повторная попытка...");
      await restartTor();
    }
  }

  console.log("Не удалось удалить фон после максимального количества попыток.");
  return imageBuffer;
};
