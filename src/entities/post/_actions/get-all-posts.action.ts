"use server";

import { getAllPostsUseCase } from "../_use-cases/get-all-poss";
import { PostEntity } from "..";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import("dayjs/locale/ru");
dayjs.extend(relativeTime);

export const getAllPostsAction = async (): Promise<PostEntity[]> => {
  return await getAllPostsUseCase.exec();
};
