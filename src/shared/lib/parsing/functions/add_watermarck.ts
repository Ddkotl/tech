import sharp from "sharp";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { fileStorage } from "../../file-storage";
import { Readable } from "stream";

export const replaceWatermarkWithSharp = async (
  imagePath: string,
  replacementText: string,
) => {
  try {
    // Разделяем bucket и ключ объекта

    const bucket = imagePath.split("/")[2];
    const objectPathParts = imagePath.split("/");
    objectPathParts.splice(0, 3);
    const objectKey = objectPathParts.join("/");

    // Загружаем изображение из MinIO
    const object = await fileStorage.s3Client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: objectKey,
      }),
    );

    if (!object.Body) {
      throw new Error("Не удалось загрузить изображение из MinIO.");
    }

    // Преобразуем поток в Buffer
    const imageBuffer: Buffer = await streamToBuffer(object.Body as Readable);

    // Передаем Buffer в sharp
    const { width, height } = await sharp(imageBuffer).metadata();

    if (!width || !height) {
      throw new Error("Не удалось получить размеры изображения.");
    }

    // Задаем относительные пропорции для области водяного знака
    let xRatio = 0.6;
    let yRatio = 0.88;
    let widthRatio = 0.39;
    let heightRatio = 0.11;
    if (width > height) {
      xRatio = 0.69;
      yRatio = 0.83;
      widthRatio = 0.3;
      heightRatio = 0.15;
    }

    // Вычисляем абсолютные координаты и размеры области
    const x = Math.round(width * xRatio);
    const y = Math.round(height * yRatio);
    const regionWidth = Math.round(width * widthRatio);
    const regionHeight = Math.round(height * heightRatio);
    const fontSize = Math.round((regionWidth + regionHeight) * 0.07);

    // Извлекаем, размываем и вставляем область обратно
    const blurredRegion = await sharp(imageBuffer)
      .extract({ left: x, top: y, width: regionWidth, height: regionHeight })
      .blur(5)
      .toBuffer();

    const blurredImage = await sharp(imageBuffer)
      .composite([
        {
          input: blurredRegion,
          top: y,
          left: x,
        },
      ])
      .toBuffer();

    // Добавляем текст с градиентом и тенью
    const finalImage = await sharp(blurredImage)
      .composite([
        {
          input: Buffer.from(`
            <svg width="${regionWidth}" height="${regionHeight}" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="textShadow" x="0" y="0" width="200%" height="200%">
                  <feDropShadow dx="3" dy="3" stdDeviation="3" flood-color="rgba(41, 2, 31, 0.7)" />
                </filter>
                <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="40%" style="stop-color:rgb(160, 22, 137);stop-opacity:0.65" />
                  <stop offset="80%" style="stop-color:rgb(160, 22, 137);stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:rgb(160, 22, 137);stop-opacity:0" />
                </radialGradient>
              </defs>
              <rect x="0" y="0" width="${regionWidth}" height="${regionHeight}" fill="url(#grad)" />
              <text 
                x="${regionWidth / 2}" 
                y="${regionHeight / 1.6}" 
                font-size="${fontSize}" 
                fill="rgba(255, 255, 255, 0.9)" 
                font-weight="700" 
                font-style="italic" 
                text-anchor="middle" 
                dominant-baseline="middle" 
                letter-spacing="1px" 
                font-family="Arial"
                filter="url(#textShadow)"
              >
                ${replacementText.toLocaleUpperCase()}
              </text>
            </svg>
          `),
          top: y,
          left: x,
        },
      ])
      .sharpen()
      .modulate({
        brightness: 1.05, // Увеличение яркости
        saturation: 1.05, // Увеличение насыщенности
      })
      .normalize()
      .toBuffer();

    // Загружаем изменённое изображение обратно в MinIO
    await fileStorage.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: finalImage,
        ContentType: "image/jpeg", // Убедитесь, что MIME-тип соответствует формату изображения
      }),
    );
  } catch (error) {
    console.error("Ошибка при обработке изображения:", error);
  }
};

// Вспомогательная функция для преобразования потока в буфер
const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", (err) => reject(err));
  });
};
