"use client";

import Image from "next/image";
import Link from "next/link";

import { Eye, Heart, Bookmark } from "lucide-react";
import { useFeaturedPost } from "@/entities/post/_queries/post.queries";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components";

export function FeaturedPost() {
  const { data: featuredPost, isLoading, error } = useFeaturedPost();

  if (isLoading) return <div>Loading featured post...</div>;
  if (error) return <div>Error loading featured post</div>;
  if (!featuredPost) return null;

  return (
    <Card className="mb-12 overflow-hidden">
      <div className="relative w-full pt-[56.25%]">
        <Image
          src={featuredPost.previewImage || "/placeholder.svg"}
          alt={featuredPost.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-3xl">{featuredPost.title}</CardTitle>
        <CardDescription>{featuredPost.category?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground mb-4">
          {featuredPost.content.substring(0, 200)}...
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Eye className="mr-1" size={16} /> {featuredPost.views}
          </span>
          <span className="flex items-center">
            <Heart className="mr-1" size={16} /> {featuredPost._count.likes}
          </span>
          <span className="flex items-center">
            <Bookmark className="mr-1" size={16} />{" "}
            {featuredPost._count.bookmarks}
          </span>
        </div>
        <Button asChild>
          <Link href={`/posts/${featuredPost.id}`}>Read Full Article</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
