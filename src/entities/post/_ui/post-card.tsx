"use client";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";

import Image from "next/image";
import Link from "next/link";
import { PostWithCategoryAndCountLikesBookmarks } from "../_domain/types";
import { Bookmark, Eye, Heart } from "lucide-react";

export function PostCard({
  post,
}: {
  post: PostWithCategoryAndCountLikesBookmarks;
}): JSX.Element {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="md:p-3 p-2">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={post.previewImage || "/placeholder.png"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="h-10 rounded-md object-cover"
          />
        </AspectRatio>
        <CardTitle className="text-xl">{post.title}</CardTitle>
        <CardDescription className="text-foreground/40">
          {post.category?.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="md:p-3 p-2">
        <p>{post.content.substring(0, 150)}...</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center md:p-3 p-2">
        <div className="flex flex-wrap  justify-between w-full m-auto  items-center   gap-2">
          <div className="flex space-x-4">
            <span className="flex items-center">
              <Eye className="mr-1" size={16} /> {post.views}
            </span>
            <span className="flex items-center">
              <Heart className="mr-1" size={16} /> {post._count.likes}
            </span>
            <span className="flex items-center">
              <Bookmark className="mr-1" size={16} /> {post._count.bookmarks}
            </span>
          </div>
          <Button asChild>
            <Link href={`/posts/${post.id}`}>Читать дальше</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
