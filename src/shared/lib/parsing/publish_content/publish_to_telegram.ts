async function publishToTelegram({
  metaTitle,
  metaDescription,
  slug,
  date,
  ruTitle,
  content,
  previewImage,
  images,
  bucketName,
}: {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  date: Date;
  ruTitle: string;
  content: string;
  previewImage: string;
  images: string[];
  bucketName: string;
}) {
  const fileStorage = new FileStorage();

  try {
    // Генерируем временные URL для всех изображений
    const imageUrls = await Promise.all(
      [previewImage, ...images].map((image) =>
        fileStorage.generatePresignedUrl(bucketName, image)
    );

    // Формируем текст поста
    const postText = `
<b>${ruTitle}</b>

${content}

<a href="https://tech24view.ru/${slug}">Читать подробнее на сайте</a>
    `;

    // Создаем медиагруппу
    const mediaGroup = imageUrls.map((url, index) => ({
      type: 'photo',
      media: url, // Используем временный URL
      caption: index === 0 ? postText : '', // Текст добавляем только к первой картинке
      parse_mode: 'HTML',
    }));

    // Отправляем медиагруппу в канал
    await bot.sendMediaGroup(CHANNEL_ID, mediaGroup);

    console.log('Пост успешно опубликован в Telegram-канал!');
  } catch (error) {
    console.error('Ошибка при публикации поста в Telegram:', error);
  }
}

// Пример использования
publishToTelegram({
  metaTitle: 'Новый обзор смартфона',
  metaDescription: 'Обзор нового флагмана 2023 года',
  slug: 'new-smartphone-review',
  date: new Date(),
  ruTitle: 'Обзор нового смартфона 2023 года',
  content: '<b>Новый смартфон</b> поражает своими характеристиками...',
  previewImage: 'preview.jpg', // Название файла в MinIO
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'], // Названия файлов в MinIO
  bucketName: 'your-bucket-name', // Название бакета в MinIO
});
