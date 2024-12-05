import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/shared/components";
import { dataBase } from "@/shared/lib/db_conect";
import { Calendar, Eye, Heart, Bookmark } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import LikeButton from "./likeButton";
import BookmarkButton from "./bookmarkButton";

async function getPost(id: string) {
  const post = await dataBase.post.findUnique({
    where: { id },
    include: {
      category: true,
      _count: {
        select: { likes: true, bookmarks: true },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="relative w-full h-[400px]">
          <Image
            src={post.previewImage || "/placeholder.png"}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
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
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.png" alt="Author" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Author Name</p>
              <p className="text-sm text-muted-foreground">
                <Calendar className="inline mr-1" size={16} />
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <Separator className="my-4" />
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <span className="flex items-center">
                <Eye className="mr-1" size={16} /> {post.views} views
              </span>
              <span className="flex items-center">
                <Heart className="mr-1" size={16} /> {post._count.likes} likes
              </span>
              <span className="flex items-center">
                <Bookmark className="mr-1" size={16} /> {post._count.bookmarks}{" "}
                bookmarks
              </span>
            </div>
            <div className="flex space-x-2">
              <LikeButton postId={post.id} />
              <BookmarkButton postId={post.id} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
