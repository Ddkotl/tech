"use server";
import { getAllPostsUseCase } from "../_use-cases/get-all-poss";

export const getAllPostsAction = async () => {
  const posts = await getAllPostsUseCase.exec();

  return posts;
};
