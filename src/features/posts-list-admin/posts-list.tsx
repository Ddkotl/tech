"use client";
import { useQuery } from "@tanstack/react-query";
import { PostsTable } from "./_ui/posts-tabl";
import { getAllPostsQuery } from "@/entities/post/post";
import { Spinner } from "@/shared/components";

export function PostsList() {
  const postsQuery = useQuery({
    ...getAllPostsQuery(),
  });

  if (postsQuery.isPending) {
    return <Spinner aria-label="Загрузка профиля" />;
  }

  if (!postsQuery.data) {
    return (
      <div>Не удалось загрузить список постов, возможно что-то сломалось</div>
    );
  }
  return <PostsTable data={postsQuery.data} />;
}
