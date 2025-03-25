import { privateConfig } from "../../config/private";
import TelegramBot, { InputMediaPhoto } from "node-telegram-bot-api";

export async function publishToTelegram({
  type,
  slug,
  meta_description,
  ruTitle,
  previewImage,
  images,
}: {
  type: "news" | "reviews";
  slug: string;
  ruTitle: string;
  meta_description: string;
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
    const imageUrls = [previewImage, ...images].map((image) => {
      return `https://tech24view.ru${image}`;
    });

    console.log(imageUrls);
    // Формируем текст поста
    const postText = `<b>${ruTitle}</b>\n\n${meta_description}\n\n<a href="https://tech24view.ru/${type}/${slug}">Читать полностью на сайте</a>\n\n<a href="https://tech24view.ru">Новости, обзоры, характеристики</a>`;

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
    console.log("Ошибка при публикации поста в Telegram:", error);
  }
}
