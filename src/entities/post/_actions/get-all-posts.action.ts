"use server";
import { GetTimeFromNow } from "@/shared/lib/dataTime/get-time-from-now";
import { getAllPostsUseCase } from "../_use-cases/get-all-poss";
import { PostEntity } from "../post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import("dayjs/locale/ru");
dayjs.extend(relativeTime);

export const getAllPostsAction = async (): Promise<PostEntity[]> => {
  const posts = await getAllPostsUseCase.exec();
  return GetTimeFromNow(posts);
};
