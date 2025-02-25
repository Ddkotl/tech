import axios from "axios";
import { getImageName } from "./image/get_image_name";
import { replaceWatermarkWithSharp } from "./image/add_watermarck";
import { fileStorage } from "../../file-storage";
import { removeImageBackgroundWithRetry } from "./image/remove_bg/rm_image_bg";
import { restartTor } from "../../tor";
import { removeWattermarkWithRetry } from "./image/remove_watermarc/rm_image_watermarc";

export const downloadImageForS3 = async (
  url: string,
  textForFilename: string | undefined,
  imgDirNameInStorage: string,
  convert_to_png: boolean = false,
  remove_wattermark: boolean = false,
  proxy_tor: boolean = false,
) => {
  try {
    if (proxy_tor) {
      await restartTor();
    }
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
    if (remove_wattermark) {
      processedImageBuffer = await removeWattermarkWithRetry(response.data);
    }
    if (convert_to_png) {
      processedImageBuffer = await removeImageBackgroundWithRetry(
        response.data,
      );
    }
    // Создаем Blob из массива байтов
    const blob = new Blob([processedImageBuffer], { type: contentType });

    // Создаем File из Blob (если имя файла известно)
    const file = new File([blob], imgName, { type: contentType });

    const storedFile = await fileStorage.uploadImage(
      file,
      imgDirNameInStorage,
      imgName,
    );

    await replaceWatermarkWithSharp(storedFile.path, "tech24view.ru");
    return storedFile.path;
  } catch (error) {
    console.warn("Failed to download image:", url, error);
    return null;
  }
};
