"use server";

import { revalidatePath } from "next/cache";
import { CreatePostListElementCommand } from "./model/types";
import { postsRepository } from "./post.repository";

export const createPostAction = async (
  command: CreatePostListElementCommand,
  revalidatePagePath: string,
) => {
  await postsRepository.createPostElement(command);
  revalidatePath(revalidatePagePath);
};
