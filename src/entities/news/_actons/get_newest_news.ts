// "use server";
// import { z } from "zod";

// const resultSchema = z.object({
//   newsCard: z.object({
//     id: z.string(),
//     title: z.string(),
//     content: z.string(),
//     createdAt: z.date(),
//     updatedAt: z.date(),
//     author: z.object({
//       id: z.string(),
//       name: z.string(),
//     }),
//   }),
// });

// export const getUserProfileAction = async (
//   data: z.infer<typeof propsSchema>,
// ) => {
//   const { userId } = propsSchema.parse(data);

//   const session = await getAppSessionStrictServer();

//   const user = await getUserUseCase.exec({ userId, session });

//   return resultSchema.parseAsync({ profile: user });
// };
