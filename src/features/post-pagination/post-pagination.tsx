"use client";

import { getPostsCountQuery } from "@/entities/post";
import { getPaginatedPostQuery } from "@/entities/post/_queries/get-paginated-posts-query";
import { PostCard } from "@/entities/post/_ui/post-card";
import { Button } from "@/shared/components";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function PostPaginated({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 9;

  const totalPosts = useQuery({
    ...getPostsCountQuery(),
  });
  const totalPages = Math.ceil(
    totalPosts.data ? totalPosts.data : 0 / pageSize,
  );

  const posts = useQuery({
    ...getPaginatedPostQuery(page, pageSize),
  });

  const getPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = "...";
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(ellipsis, totalPages);
      } else if (page >= totalPages - 2) {
        pageNumbers.push(1, ellipsis);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(
          1,
          ellipsis,
          page - 1,
          page,
          page + 1,
          ellipsis,
          totalPages,
        );
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {posts.data?.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-center items-center space-x-2">
        {page > 1 && (
          <Button asChild variant="outline">
            <Link href={`/posts?page=${page - 1}`}>Предыдущая</Link>
          </Button>
        )}
        {getPageNumbers().map((pageNum, index) =>
          pageNum === "..." ? (
            <span key={index} className="px-2">
              ...
            </span>
          ) : (
            <Button
              key={index}
              variant={pageNum === page ? "default" : "outline"}
              asChild
            >
              <Link href={`/posts?page=${pageNum}`}>{pageNum}</Link>
            </Button>
          ),
        )}
        {page < totalPages && (
          <Button asChild variant="outline">
            <Link href={`/posts?page=${page + 1}`}>Следующая</Link>
          </Button>
        )}
      </div>
    </>
  );
}
