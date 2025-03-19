"use server";
import { z } from "zod";
import { getUserUseCase } from "../_use-cases/get-user";

import { getAppSessionStrictServer } from "../get-app-session.server";
import { profileSchema } from "../_domain/schemas";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const getUserProfileAction = async (data: z.infer<typeof propsSchema>) => {
  const { userId } = propsSchema.parse(data);

  const session = await getAppSessionStrictServer();

  const user = await getUserUseCase.exec({ userId, session });

  return resultSchema.parseAsync({ profile: user });
};
