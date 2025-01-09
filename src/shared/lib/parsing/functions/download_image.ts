import axios from "axios";
import { getImageName } from "./get_image_name";
import { replaceWatermarkWithSharp } from "./add_watermarck";

import { fileStorage } from "../../file-storage";

export const downloadImage = async (
  url: string,
  textForFilename: string | undefined,
  imgDir: string,
) => {
  try {
    const imgName = getImageName(textForFilename);
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    });
    const contentType =
      response.headers["content-type"] || "application/octet-stream";

    // Создаем Blob из массива байтов
    const blob = new Blob([response.data], { type: contentType });

    // Создаем File из Blob (если имя файла известно)
    const file = new File([blob], imgName, { type: contentType });
    const storedFile = await fileStorage.uploadImage(file, imgDir, imgName);

    await replaceWatermarkWithSharp(storedFile.path, "tech24view.ru");
    return storedFile.path;
  } catch (error) {
    console.warn("Failed to download image:", url, error);
    return null;
  }
};
