import { restartTor } from "@/shared/lib/tor";
import { removeWattermarkDewatermarck } from "./remove_watter_mark_dewatermarc";

export const removeWattermarkWithRetry = async (
  imageBuffer: Buffer,
  textDelete: boolean,
  maxRetries: number = 10,
): Promise<Buffer> => {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      return await removeWattermarkDewatermarck(imageBuffer, textDelete);
    } catch (error) {
      attempts++;
      console.error(`Ошибка при удалении вотермарки (попытка ${attempts}):`, error);

      if (attempts < maxRetries) {
        console.log("Перезапуск Tor и повторная попытка...");
        await restartTor();
      } else {
        console.log("Не удалось удалить вотермарку после максимального количества попыток");
      }
    }
  }

  return imageBuffer;
};
