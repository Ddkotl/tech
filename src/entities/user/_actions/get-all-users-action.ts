"use server";
import { GetTimeFromNow } from "@/shared/lib/dataTime/get-time-from-now";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { UserEntity } from "../_domain/types";
import { getAllUsersUseCase } from "../_use-cases/get-all-users";
import { getAppSessionStrictServer } from "../get-app-session.server";
import("dayjs/locale/ru");
dayjs.extend(relativeTime);

export const getAllUsersAction = async (): Promise<UserEntity[]> => {
  const session = await getAppSessionStrictServer();
  const users = await getAllUsersUseCase.exec(session);
  return GetTimeFromNow(users);
};
