import { PartialReviews } from "@/entities/reviews";
import { PhoneModels, Specification } from "@prisma/client";

export type PartialPhoneModel = Pick<
  PhoneModels,
  "id" | "short_name" | "main_image" | "slug" | "full_name"
>;

export type PhoneModeLFullInfo = PhoneModels & {
  specifications: Specification[];
  Reviews: PartialReviews[];
};
