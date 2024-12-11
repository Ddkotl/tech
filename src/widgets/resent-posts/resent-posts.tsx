"use client";

import { useRecentPosts } from "@/entities/post/_queries/post.queries";
import { PostCard } from "@/entities/post/_ui/post-card";



export function RecentPosts() {
  const { data: recentPosts, isLoading, error } = useRecentPosts();

  if (isLoading) return <div>Loading recent posts...</div>;
  if (error) return <div>Error loading recent posts</div>;
  if (!recentPosts) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
