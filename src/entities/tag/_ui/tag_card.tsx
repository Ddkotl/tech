"use client";
import { getNewsDeclension } from "@/entities/news";
import { getReviewDeclension } from "@/entities/reviews";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components";
import Link from "next/link";

export function TagCard({
  tagSlug,
  tagTitle,
  newsCount,
  reviewsCount,
}: {
  tagSlug: string;
  tagTitle: string;
  newsCount: number;
  reviewsCount: number;
}) {
  return (
    <Link href={`tags/${tagSlug}`}>
      <Card className="p-0 h-24  flex flex-col justify-evenly shadow-md transition-all  duration-300 hover:scale-95  hover:shadow-lg hover:bg-foreground/10  items-center">
        <CardHeader className="p-1 flex items-center justify-center text-center">
          <CardTitle className="  text-sm  ">{tagTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-1  items-center justify-center">
          <p className="text-xs text-muted-foreground ">
            {newsCount} {getNewsDeclension(newsCount)}
          </p>
          <p className="text-xs text-muted-foreground ">
            {reviewsCount} {getReviewDeclension(reviewsCount)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
