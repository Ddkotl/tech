import { News, NewsBookmark, Tag } from "@prisma/client";

export type NewsWithIncludes = News & {
  tags: Tag[];
  bookmarks: NewsBookmark[];
  bookmarksCount: number;
};
