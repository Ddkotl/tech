import { z } from "zod";

const privateConfigSchema = z.object({
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  YANDEX_CLIENT_ID: z.string().optional(),
  YANDEX_CLIENT_SECRET: z.string().optional(),

  MAILRU_CLIENT_ID: z.string().optional(),
  MAILRU_CLIENT_SECRET: z.string().optional(),

  ADMIN_EMAILS: z.string().optional(),
});

export const privateConfig = privateConfigSchema.parse(process.env);
