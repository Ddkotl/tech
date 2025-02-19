import { PhoneModels } from "@prisma/client";

export type PartialPhoneModel = Pick<
  PhoneModels,
  "id" | "short_name" | "main_image"
>;
