import { mkdir } from "fs/promises";
import { IMG_DIR } from "../config";

export const setupDirectories = async () => {
  try {
    await mkdir(IMG_DIR, { recursive: true });
    await mkdir(`${IMG_DIR}/news`, { recursive: true });
    await mkdir(`${IMG_DIR}/news_preview`, { recursive: true });
    await mkdir(`${IMG_DIR}/reviews`, { recursive: true });
    await mkdir(`${IMG_DIR}/reviews_preview`, {
      recursive: true,
    });

    console.log(`Dirs created:
        ${IMG_DIR}
        ${IMG_DIR}/news
        ${IMG_DIR}/news_preview
        ${IMG_DIR}/reviews
        ${IMG_DIR}/reviews_preview`);
  } catch (error) {
    console.log(error);
  }
};
