import { Reviews, Tag } from "@prisma/client";
import { delay } from "./delay";
import { transliterateToUrl } from "../../transliteration";
import { isTagExist } from "./is_tag_exist";
import { dataBase } from "../../db_conect";

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
  mobileModelName: string,
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
  const parsedTags: Tag[] = await Promise.all(tagPromises);
  const tagsForAdd: Tag[] = parsedTags.filter((el) => el !== undefined);
  // Добавляем новость в базу
  await dataBase.reviewsParsedTitles.create({
    data: { title: ingTitle },
  });

  const createdReview: Reviews = await dataBase.reviews.upsert({
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
        connect: tagsForAdd.map((tag) => ({ id: tag.id })), // Соединяем новость с тегами
      },
      // phoneModel: {
      //   connect: {
      //     short_name: mobileModelName,
      //   },
      // },
    },
  });

  try {
    await dataBase.reviews.upsert({
      where: { title: ruTitle },
      update: {
        phoneModel: {
          connect: {
            short_name: mobileModelName,
          },
        },
      },
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
          connect: tagsForAdd.map((tag) => ({ id: tag.id })), // Соединяем новость с тегами
        },
        // phoneModel: {
        //   connect: {
        //     short_name: mobileModelName,
        //   },
        // },
      },
    });
  } catch (error) {
    console.log(`Не удалось привязать обзор к модели телефона`, error);
  }

  console.log(`Created review with title: ${createdReview.title}`);
  await delay(1000);
  if (privateConfig.NODE_ENV === "production") {
    console.log("start parse to tg");
    await publishToTelegram({
      type: "reviews",
      slug:slug,
      meta_description: metaDescription,
      previewImage: previewImage,
      ruTitle: ruTitle,
      tags: tags,
    });
    await delay(1000);
    await publishToInstagram({
      type: "reviews",
      content: content,
      previewImage: previewImage,
      ruTitle: ruTitle,
      tags: tags,
    });
  }
}
