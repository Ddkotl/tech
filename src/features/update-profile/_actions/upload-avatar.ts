"use server";
import { z } from "zod";
import { AVATAR_FILE_KEY } from "../_constants";
import { BadRequest } from "@/lib/errors";

const resultSchema = z.object({
  avatar: z.object({
    path: z.string(),
  }),
});

export const uploadAvatarAction = async (formData: FormData) => {
  const file = formData.get(AVATAR_FILE_KEY);
  if (!(file instanceof File)) {
    throw new BadRequest();
  }

  const storedFile = await fileStorage.uploadImage(file, AVATAR_FILE_KEY);

  return resultSchema.parse({
    avatar: storedFile,
  });
};
