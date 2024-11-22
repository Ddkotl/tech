"use server";
import { z } from "zod";
import { postSchema } from "../_domain/schemas";
import { getAllPostsUseCase } from "../_use-cases/get-all-poss";

const resultSchema = z.object({
  posts: postSchema,
});

export const getAllPostsAction = async () => {
  const posts = await getAllPostsUseCase.exec();

  return resultSchema.parseAsync({ posts: posts });
};
