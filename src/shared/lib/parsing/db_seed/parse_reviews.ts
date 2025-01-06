import { dataBaseParse } from "./db_connect";
import { Reviews, Tag } from "@prisma/client";
import { delay } from "./delay";
import { transliterateToUrl } from "../../transliteration";

export async function ParseReviews(
  metaTitle: string,
  metaDescription: string,
  slug: string,
  date: Date,
  ingTitle: string,
  ruTitle: string,
  content: string,
  previewImage: string,
  images: string[],
  tags: string[],
) {
  const tagPromises = tags.map((tag): Promise<Tag> => {
    return dataBaseParse.tag.upsert({
      where: { title: tag },
      update: {}, // Если тег существует, ничего не изменяем
      create: { title: tag, slug: transliterateToUrl(slug) }, // Если нет, создаем новый
    });
  });

  // Ждем завершения добавления всех тегов
  const createdTags = await Promise.all(tagPromises);

  // Добавляем новость в базу
  const createdReview: Reviews = await dataBaseParse.reviews.upsert({
    where: { title: ruTitle },
    update: {},
    create: {
      meta_title: metaTitle,
      meta_description: metaDescription,
      slug: slug,
      createdAt: date,
      title: ruTitle,
      content: content,
      previewImage: previewImage,
      images: images,
      tags: {
        connect: createdTags.map((tag) => ({ id: tag.id })), // Соединяем новость с тегами
      },
    },
  });

  await dataBaseParse.reviewsParsedTitles.upsert({
    where: { title: ingTitle },
    update: {},
    create: {
      title: ingTitle,
    },
  });

  console.log(`Created review with title: ${createdReview.title}`);
  await delay(1000);
}
