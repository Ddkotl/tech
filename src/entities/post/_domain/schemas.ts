import { z } from "zod";

export const postSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
