import { News, NewsBookmark, Tag } from "@prisma/client";

export type PartialNews = Pick<
  News,
  | "id"
  | "createdAt"
  | "previewImage"
  | "slug"
  | "views"
  | "title"
  | "meta_description"
>;

export type NewsWithIncludes = News & {
  tags: Tag[];
  bookmarks: NewsBookmark[];
  bookmarksCount: number;
};

export type PartialNewsWithTags = PartialNews & {
  tags: Pick<Tag, "slug" | "title">[];
};
export type PartialNewsBySitemap = Pick<
  News,
  "createdAt" | "slug" | "updatedAt"
>;
