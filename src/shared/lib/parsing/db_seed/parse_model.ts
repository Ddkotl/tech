import { PhoneModels } from "@prisma/client";
import { dataBase } from "../../db_conect";

export const parseModel = async ({
  shortName,
  fullName,
  slug,
  brandName,
  modelImgPath,
  releaseDate,
  weight,
  thicknes,
  os,
  storage,
  ram,
  processor,
  screen_duim,
  screen_px,
  camera_photo,
  camera_video,
  batary_capasity,
  description,
  contentImagesPaths,
}: {
  shortName: string;
  fullName: string;
  slug: string;
  brandName: string;
  modelImgPath: string;
  releaseDate: string;
  weight: string;
  thicknes: string;
  os: string;
  storage: string;
  ram: string;
  processor: string;
  screen_duim: string;
  screen_px: string;
  camera_photo: string;
  camera_video: string;
  batary_capasity: string;
  description: string;
  contentImagesPaths: string[];
}) => {
  try {
    const createdModel: PhoneModels = await dataBase.phoneModels.upsert({
      where: { short_name: shortName },
      update: {},
      create: {
        full_name: fullName,
        short_name: shortName,
        slug: slug,
        main_image: modelImgPath,
        brand: {
          connect: {
            name: brandName,
          },
        },
        specifications: {
          create: {
            images: contentImagesPaths,
            releaseDate: releaseDate,
            weight: weight,
            thickness: thicknes,
            oc: os,
            storage: storage,
            ram: ram,
            processor: processor,
            screen_duim: screen_duim,
            screen_px: screen_px,
            camera_photo: camera_photo,
            camera_video: camera_video,
            batary_capasity: batary_capasity,
            description: description,
          },
        },
      },
    });
    console.log("Model created: ", createdModel.full_name);
  } catch (error) {
    console.log("Error creating model: ", error);
  }
};
