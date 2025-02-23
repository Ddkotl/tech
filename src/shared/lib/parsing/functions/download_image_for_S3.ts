import axios from "axios";
import { getImageName } from "./get_image_name";
import { replaceWatermarkWithSharp } from "./add_watermarck";
import { fileStorage } from "../../file-storage";
import { removeBackgroundWithphotiu } from "./remove_bg_sait_photiu";
import { removeBackgroundWithCarve } from "./remove_bg_sait_cave";

export const downloadImage = async (
  url: string,
  textForFilename: string | undefined,
  imgDir: string,
  convert_to_png: boolean = false,
) => {
  try {
    const imgName = getImageName(convert_to_png, textForFilename);
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    });
    const contentType =
      response.headers["content-type"] || "application/octet-stream";
    let processedImageBuffer = response.data;
    try {
      if (convert_to_png) {
        try {
          // Первая попытка удалить фон с помощью removeBackgroundWithphotiu
          processedImageBuffer = await removeBackgroundWithphotiu(
            response.data,
          );
        } catch (firstError) {
          console.error(
            "Ошибка при удалении фона с помощью removeBackgroundWithphotiu:",
            firstError,
          );

          // Вторая попытка удалить фон с помощью removeBackgroundWithCarve
          try {
            processedImageBuffer = await removeBackgroundWithCarve(
              response.data,
            );
          } catch (secondError) {
            console.error(
              "Ошибка при удалении фона с помощью removeBackgroundWithCarve:",
              secondError,
            );
            // Если вторая попытка тоже неудачна, оставляем processedImageBuffer неизменным
          }
        }
      }
    } catch (error) {
      console.error("Общая ошибка при обработке изображения:", error);
      // В случае общей ошибки processedImageBuffer остается неизменным
    }
    // Создаем Blob из массива байтов
    const blob = new Blob([processedImageBuffer], { type: contentType });

    // Создаем File из Blob (если имя файла известно)
    const file = new File([blob], imgName, { type: contentType });

    // if (convert_to_png) {
    //   file = await convertToPNG(file);
    // }

    const storedFile = await fileStorage.uploadImage(file, imgDir, imgName);

    await replaceWatermarkWithSharp(storedFile.path, "tech24view.ru");
    return storedFile.path;
  } catch (error) {
    console.warn("Failed to download image:", url, error);
    return null;
  }
};
