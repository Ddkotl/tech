import Link from "next/link";

import { dataBase } from "@/shared/lib/db_conect";
import { PostWithCategoryAndCountLikesBookmarks } from "@/entities/post/_domain/types";
import { Button } from "@/shared/components";
import { PostCard } from "@/entities/post/_ui/post-card";

export default async function Posts({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 9;

  const totalPosts = await dataBase.post.count();
  const totalPages = Math.ceil(totalPosts / pageSize);

  const posts: PostWithCategoryAndCountLikesBookmarks[] =
    await dataBase.post.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: true,
        _count: {
          select: { likes: true, bookmarks: true },
        },
      },
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Все посты</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center space-x-2">
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
    </div>
  );
}
