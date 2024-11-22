"use server";
import { z } from "zod";
import { postSchema } from "../_domain/schemas";
import { getPostUseCase } from "../_use-cases/get-post";

const propsSchema = z.object({
  postId: z.string(),
});

const resultSchema = z.object({
  post: postSchema,
});

export const getPostAction = async (data: z.infer<typeof propsSchema>) => {
  const { postId } = propsSchema.parse(data);

  const post = await getPostUseCase.exec(postId);

  return resultSchema.parseAsync({ post: post });
};
