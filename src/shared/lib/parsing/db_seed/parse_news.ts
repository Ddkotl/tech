import { News, Tag } from "@prisma/client";
import { delay } from "./delay";
import { transliterateToUrl } from "../../transliteration";
import { isTagExist } from "./is_tag_exist";
import { dataBase } from "../../db_conect";

export async function ParseNews(
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
  const tagPromises = tags.map(async (tag) => {
    const slug = transliterateToUrl(tag);
    const isTagE = await isTagExist(slug);
    if (!isTagE) {
      return await dataBase.tag.upsert({
        where: { title: tag },
        update: {}, // Если тег существует, ничего не изменяем
        create: { title: tag, slug: slug }, // Если нет, создаем новый
      });
    } else {
      return isTagE;
    }
  });

  // Ждем завершения добавления всех тегов
  const addedTags = await Promise.all(tagPromises);
  const createdTags: Tag[] = addedTags.filter((el) => el !== undefined);
  // Добавляем новость в базу
  await dataBase.newsParsedTitles.upsert({
    where: { title: ingTitle },
    update: {},
    create: {
      title: ingTitle,
    },
  });

  const createdNews: News = await dataBase.news.upsert({
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

  console.log(`Created news with title: ${createdNews.title}`);
  await delay(1000);
  // await publishToTelegram({
  //   type: "news",
  //   slug: slug,
  //   meta_description: metaDescription,
  //   images: images,
  //   previewImage: previewImage,
  //   ruTitle: ruTitle,
  // });
}
