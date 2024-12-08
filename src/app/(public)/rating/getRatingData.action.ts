"use server";

import { dataBase } from "@/shared/lib/db_conect";

export type RatingPeriod = "today" | "yesterday" | "week" | "month" | "all";
export type RatingType = "views" | "likes" | "bookmarks";

export async function getRatingData(
  period: RatingPeriod,
  type: RatingType,
  page: number,
) {
  const pageSize = 9;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let dateFilter: any = {};
  const now = new Date();

  switch (period) {
    case "today":
      dateFilter = { gte: new Date(now.setHours(0, 0, 0, 0)) };
      break;
    case "yesterday":
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      dateFilter = {
        gte: new Date(yesterday.setHours(0, 0, 0, 0)),
        lt: new Date(now.setHours(0, 0, 0, 0)),
      };
      break;
    case "week":
      const lastWeek = new Date(now);
      lastWeek.setDate(lastWeek.getDate() - 7);
      dateFilter = { gte: lastWeek };
      break;
    case "month":
      const lastMonth = new Date(now);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      dateFilter = { gte: lastMonth };
      break;
    default:
      dateFilter = {};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orderBy: any = {};
  switch (type) {
    case "views":
      orderBy = { views: "desc" };
      break;
    case "likes":
      orderBy = { likes: { _count: "desc" } };
      break;
    case "bookmarks":
      orderBy = { bookmarks: { _count: "desc" } };
      break;
    default:
      orderBy = { views: "desc" };
  }

  const [topPosts, remainingPosts, totalCount] = await Promise.all([
    dataBase.post.findMany({
      where: {
        published: true,
        createdAt: dateFilter,
      },
      orderBy,
      take: 10,
      include: {
        category: true,
        _count: {
          select: { likes: true, bookmarks: true },
        },
      },
    }),
    dataBase.post.findMany({
      where: {
        published: true,
        createdAt: dateFilter,
      },
      orderBy,
      skip: 10 + (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: true,
        _count: {
          select: { likes: true, bookmarks: true },
        },
      },
    }),
    dataBase.post.count({
      where: {
        published: true,
        createdAt: dateFilter,
      },
    }),
  ]);

  const totalPages = Math.ceil((totalCount - 10) / pageSize);

  return { topPosts, remainingPosts, totalPages };
}
