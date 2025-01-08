"use client";

import { Heart, Bookmark } from "lucide-react";
import { News } from "@prisma/client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components";
import Link from "next/link";

interface NewsCardProps {
  news: News & {
    tags: { title: string; slug: string }[];
    _count: { likes: number; bookmarks: number };
  };
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/news/${news.slug}`} className="hover:underline">
            {news.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {news.meta_description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {news.tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {tag.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Views: {news.views}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
