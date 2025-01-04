"use server";

import { PostCard } from "@/entities/post/_ui/post-card";
import { dataBase } from "@/shared/lib/db_conect";
import { unstable_cache } from "next/cache";

const getResentPosts = unstable_cache(
  async () => {
    return await dataBase.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      include: {
        category: true,
        _count: { select: { likes: true, bookmarks: true } },
      },
    });
  },
  ["posts"],
  { revalidate: 3600, tags: ["posts"] },
);

export async function RecentPosts() {
  const recentPosts = await getResentPosts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
