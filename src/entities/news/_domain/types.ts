import { News, Tag } from "@prisma/client";

export type NewsWithTags = News & {
  tags: Tag[];
};
