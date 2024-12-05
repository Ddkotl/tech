import Link from "next/link";
import Image from "next/image";

import { Eye, Heart, Bookmark } from "lucide-react";
import { dataBase } from "@/shared/lib/db_conect";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  Title,
} from "@/shared/components";
import { AspectRatio } from "@/shared/components/ui/aspect-ratio";

export default async function Posts({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 9;

  const totalPosts = await dataBase.post.count({ where: { published: true } });
  const totalPages = Math.ceil(totalPosts / pageSize);

  const posts = await dataBase.post.findMany({
    where: { published: true },
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
    <Container>
      <Title text="Все посты" size="xs"></Title>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {posts.map((post) => (
          <Card className="flex flex-col justify-between" key={post.id}>
            <CardHeader>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={post.previewImage || "/placeholder.png"}
                  alt={post.title}
                  fill
                  className="h-10 rounded-md object-cover"
                />
              </AspectRatio>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <CardDescription className="text-foreground/40">
                {post.category?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.content.substring(0, 150)}...</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex flex-col justify-between items-center m-auto gap-4">
                <div className="flex space-x-4">
                  <span className="flex items-center">
                    <Eye className="mr-1" size={16} /> {post.views}
                  </span>
                  <span className="flex items-center">
                    <Heart className="mr-1" size={16} /> {post._count.likes}
                  </span>
                  <span className="flex items-center">
                    <Bookmark className="mr-1" size={16} />{" "}
                    {post._count.bookmarks}
                  </span>
                </div>
                <Button asChild>
                  <Link href={`/posts/${post.id}`}>Читать дальше</Link>
                </Button>{" "}
              </div>
            </CardFooter>
          </Card>
        ))}
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
    </Container>
  );
}
