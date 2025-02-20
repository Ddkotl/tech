import { Reviews } from "@prisma/client";

export type PartialReviews = Pick<
  Reviews,
  "id" | "createdAt" | "previewImage" | "slug" | "views" | "title"
>;
