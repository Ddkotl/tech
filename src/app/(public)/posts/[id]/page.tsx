import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ContentContainer,
  Separator,
} from "@/shared/components";
import { dataBase } from "@/shared/lib/db_conect";
import { Calendar, Eye, Heart, Bookmark } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import LikeButton from "./likeButton";
import BookmarkButton from "./bookmarkButton";
import { UserId } from "@/entities/user";
import { getAppSessionServer } from "@/entities/user/get-app-session.server";
import { incrementViewCount } from "./post.actions";
import { AspectRatio } from "@/shared/components/ui/aspect-ratio";

async function getPost(id: string, userId: UserId) {
  const post = await dataBase.post.findUnique({
    where: { id },
    include: {
      category: true,
      _count: {
        select: { likes: true, bookmarks: true },
      },
      likes: userId
        ? {
            where: { userId },
          }
        : false,
      bookmarks: userId
        ? {
            where: { userId },
          }
        : false,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getAppSessionServer();
  const userId = session?.user?.id;
  const post = await getPost(params.id, userId);

  await incrementViewCount(params.id);

  const isLiked = post.likes && post.likes.length > 0;
  const isBookmarked = post.bookmarks && post.bookmarks.length > 0;

  return (
    <div className="mx-auto px-2 py-4">
      <ContentContainer>
        <Card className="overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={post.previewImage || "/placeholder.png"}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </AspectRatio>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
              <CardDescription>
                <span className="inline-flex items-center bg-primary-foreground text-primary rounded-full px-3 py-1">
                  {post.category?.name}
                </span>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex  items-center space-x-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  <Calendar className="inline mr-1" size={16} />
                  {format(new Date(post.createdAt), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="prose max-w-none">{post.content}</div>
            <Separator className="my-4" />
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="flex space-x-4">
                <span className="flex items-center">
                  <Eye className="mr-1" size={16} /> {post.views + 1}
                </span>
                <span className="flex items-center">
                  <Heart className="mr-1" size={16} /> {post._count.likes}
                </span>
                <span className="flex items-center">
                  <Bookmark className="mr-1" size={16} />{" "}
                  {post._count.bookmarks}{" "}
                </span>
              </div>
              <div className="flex space-x-2">
                <LikeButton postId={post.id} initialIsLiked={isLiked} />
                <BookmarkButton
                  postId={post.id}
                  initialIsBookmarked={isBookmarked}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentContainer>
    </div>
  );
}
