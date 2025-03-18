import { privateConfig } from "../../config/private";
import { fileStorage } from "../../file-storage";
import TelegramBot, { InputMediaPhoto } from "node-telegram-bot-api";

export async function publishToTelegram({
  ruTitle,
  content,
  previewImage,
  images,
}: {
  ruTitle: string;
  content: string;
  previewImage: string;
  images: string[];
}) {
  try {
    if (!privateConfig.TELEGRAM_BOT_KEY || !privateConfig.TELEGRAM_CHANNEL_ID) {
      return;
    }
    const bot = new TelegramBot(privateConfig.TELEGRAM_BOT_KEY, {
      polling: false,
    });
    // Генерируем временные URL для всех изображений
    const imageUrls = await Promise.all(
      [previewImage, ...images].map((image) =>
        fileStorage.generatePresignedUrl(privateConfig.S3_IMAGES_BUCKET, image),
      ),
    );
    const formattedContent = content
      .replace(/<\/?p>/g, "") // Убираем <p> и </p>
      .replace(/\n/g, "\n\n")
      .replace(/<h2>/g, "<b>")
      .replace(/<\/h2>/g, "</b>"); // Добавляем двойные переводы строк
    // Формируем текст поста
    const postText = `<b>${ruTitle}</b>\n\n${formattedContent}\n\n<a href="https://tech24view.ru">Новости, обзоры, характеристики</a>`;

    // Создаем медиагруппу
    const mediaGroup: InputMediaPhoto[] = imageUrls.map((url, index) => ({
      type: "photo",
      media: url, // Используем временный URL
      caption: index === 0 ? postText : "", // Текст добавляем только к первой картинке
      parse_mode: "HTML",
    }));

    // Отправляем медиагруппу в канал

    await bot.sendMediaGroup(privateConfig.TELEGRAM_CHANNEL_ID, mediaGroup);
    console.log("Пост успешно опубликован в Telegram!");
  } catch (error) {
    console.error("Ошибка при публикации поста в Telegram:", error);
  }
}
