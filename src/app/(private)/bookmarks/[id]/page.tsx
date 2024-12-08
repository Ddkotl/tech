import { redirect } from "next/navigation";

import { dataBase } from "@/shared/lib/db_conect";
import { getAppSessionServer } from "@/entities/user/get-app-session.server";

import { PostCard } from "@/entities/post/_ui/post-card";

async function getBookmarkedPosts(userId: string) {
  const bookmarks = await dataBase.bookmark.findMany({
    where: { userId },
    include: {
      post: {
        include: {
          category: true,
          _count: {
            select: { likes: true, bookmarks: true },
          },
        },
      },
    },
  });

  return bookmarks.map((bookmark) => bookmark.post);
}

export default async function BookmarksPage() {
  const session = await getAppSessionServer();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const bookmarkedPosts = await getBookmarkedPosts(session.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Bookmarks</h1>
      {bookmarkedPosts.length === 0 ? (
        <p>You have not bookmarked any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
