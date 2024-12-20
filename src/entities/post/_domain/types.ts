import { Prisma } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postWithCategoryAndCountLikesBookmarks =
  Prisma.validator<Prisma.PostDefaultArgs>()({
    include: {
      category: true,
      _count: { select: { likes: true, bookmarks: true } },
    },
  });

export type PostWithCategoryAndCountLikesBookmarks = Prisma.PostGetPayload<
  typeof postWithCategoryAndCountLikesBookmarks
>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postWithCategory = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    category: true,
  },
});

export type PostWithCategory = Prisma.PostGetPayload<typeof postWithCategory>;
