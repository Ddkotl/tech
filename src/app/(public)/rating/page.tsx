import { Suspense } from "react";
import Image from "next/image";

import { Eye, Heart, Bookmark } from "lucide-react";
import {
  getRatingData,
  RatingPeriod,
  RatingType,
} from "./getRatingData.action";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/components";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  previewImage: string | null;
  views: number;
  _count: {
    likes: number;
    bookmarks: number;
  };
  category: {
    name: string;
  } | null;
};

type RatingProps = {
  period: RatingPeriod;
  type: RatingType;
  page: number;
};

async function RatingContent({ period, type, page }: RatingProps) {
  const { topPosts, remainingPosts, totalPages } = await getRatingData(
    period,
    type,
    page,
  );

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Top 10</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {topPosts.map((post: Post, index: number) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={post.previewImage || "/placeholder.png"}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardTitle>
                {index + 1}. {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Category: {post.category?.name}</p>
              <div className="flex justify-between mt-2">
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
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {remainingPosts.map((post: Post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={post.previewImage || "/placeholder.png"}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Category: {post.category?.name}</p>
              <div className="flex justify-between mt-2">
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
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        {page > 1 && (
          <Button variant="outline" asChild>
            <Link
              href={`/rating?period=${period}&type=${type}&page=${page - 1}`}
            >
              Previous
            </Link>
          </Button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Button
            asChild
            key={pageNum}
            variant={pageNum === page ? "default" : "outline"}
          >
            <Link
              href={`/rating?period=${period}&type=${type}&page=${pageNum}`}
            >
              {pageNum}
            </Link>
          </Button>
        ))}
        {page < totalPages && (
          <Button variant="outline" asChild>
            <Link
              href={`/rating?period=${period}&type=${type}&page=${page + 1}`}
            >
              Next
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}

export default function Rating({
  searchParams,
}: {
  searchParams: { period?: RatingPeriod; type?: RatingType; page?: string };
}) {
  const period = searchParams.period || "today";
  const type = searchParams.type || "views";
  const page = Number(searchParams.page) || 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Top Rated Posts</h1>

      <Tabs defaultValue={period} className="mb-8">
        <TabsList>
          <TabsTrigger value="today" asChild>
            <Button variant="ghost" asChild>
              <Link href={`/rating?period=today&type=${type}&page=1`}>
                {" "}
                Today
              </Link>
            </Button>
          </TabsTrigger>
          <TabsTrigger value="yesterday" asChild>
            <Button variant="ghost" asChild>
              <Link href={`/rating?period=yesterday&type=${type}&page=1`}>
                Yesterday
              </Link>
            </Button>
          </TabsTrigger>
          <TabsTrigger value="week" asChild>
            <Button variant="ghost" asChild>
              <Link href={`/rating?period=week&type=${type}&page=1`}>
                This Week
              </Link>
            </Button>
          </TabsTrigger>
          <TabsTrigger value="month" asChild>
            <Button variant="ghost" asChild>
              <Link href={`/rating?period=month&type=${type}&page=1`}>
                This Month
              </Link>
            </Button>
          </TabsTrigger>
          <TabsTrigger value="all" asChild>
            <Button variant="ghost" asChild>
              <Link href={`/rating?period=all&type=${type}&page=1`}>
                All Time
              </Link>
            </Button>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-8">
        <Button
          variant={type === "views" ? "default" : "outline"}
          className="mr-2"
          asChild
        >
          <Link href={`/rating?period=${period}&type=views&page=1`}>Views</Link>
        </Button>
        <Button
          variant={type === "likes" ? "default" : "outline"}
          className="mr-2"
          asChild
        >
          <Link href={`/rating?period=${period}&type=likes&page=1`}>Likes</Link>
        </Button>
        <Button variant={type === "bookmarks" ? "default" : "outline"} asChild>
          <Link href={`/rating?period=${period}&type=bookmarks&page=1`}>
            Bookmarks
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <RatingContent period={period} type={type} page={page} />
      </Suspense>
    </div>
  );
}
