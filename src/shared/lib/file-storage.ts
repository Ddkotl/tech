import cuid from "cuid";
import { mkdir } from "fs/promises";
import fs from "fs";
import path from "path";

export type StoredFile = {
  id: string;
  name: string;
  path: string;
  prefix: string;
  type: string;
  eTag?: string;
};

const saveImgDir = "./public/img/avatar";
const imgDir = "/img/avatar";

class FileStorage {
  async uploadImage(file: File, tag: string): Promise<StoredFile> {
    return this.upload(file, tag);
  }

  async upload(file: File, tag: string): Promise<StoredFile> {
    if (!fs.existsSync(saveImgDir)) {
      await mkdir(saveImgDir, { recursive: true });
    }
    const uniqueName = `${tag}-${Date.now()}-${file.name}`;
    const filePath = path.join(saveImgDir, uniqueName);

    const buffer = Buffer.from(await file.arrayBuffer()); // Преобразуем File в Buffer
    await fs.promises.writeFile(filePath, buffer);

    return {
      id: cuid(),
      name: file.name,
      type: file.type,
      path: `${imgDir}/${uniqueName}`,
      prefix: imgDir,
      eTag: undefined, // Для локальных файлов не нужен eTag
    };
  }
}

export const fileStorage = new FileStorage();
