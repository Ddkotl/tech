import { removeBackgroundWithCarve } from "./remove_bg_sait_cave";
import { removeBackgroundWithphotiu } from "./remove_bg_sait_photiu";

export const removeImageBackground = async (
  imageBuffer: Buffer,
): Promise<Buffer> => {
  try {
    return await removeBackgroundWithphotiu(imageBuffer);
  } catch (firstError) {
    console.error(
      "Ошибка при удалении фона с помощью removeBackgroundWithphotiu:",
      firstError,
    );

    try {
      return await removeBackgroundWithCarve(imageBuffer);
    } catch (secondError) {
      console.error(
        "Ошибка при удалении фона с помощью removeBackgroundWithCarve:",
        secondError,
      );

      // Оба метода не сработали – возвращаем исходное изображение
      return imageBuffer;
    }
  }
};
