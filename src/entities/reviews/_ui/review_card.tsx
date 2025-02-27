"use client";

import Image from "next/image";
import { PartialReviewsWithTags } from "../_domain/types";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  TimeAgo,
} from "@/shared/components";
import Link from "next/link";

export default function ReviewCard({
  review,
}: {
  review: PartialReviewsWithTags;
}) {
  return (
    <Card className="overflow-hidden transition-all   w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row">
        <div className="relative ">
          <Image
            src={review.previewImage || "/placeholder.png"}
            alt={review.title}
            fill
            className="  object-contain"
            priority
          />
          {review?.tags.map((tag) => {
            return (
              <Badge
                key={tag.slug}
                className="absolute top-3 left-3 bg-primary/80 hover:bg-primary"
              >
                {tag.title}
              </Badge>
            );
          })}
        </div>

        {/* Content on the right (or bottom on mobile) */}
        <div className="flex flex-col flex-grow sm:w-2/3">
          <CardHeader>
            <div className="flex justify-between items-start">
              <Link href={`/reviews/${review.slug}`}>
                <CardTitle className="text-xl line-clamp-2 hover:text-foreground/60">
                  {review.title}
                </CardTitle>
              </Link>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
              <TimeAgo date={review.createdAt} />
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-sm sm:line-clamp-3">{review.meta_description}</p>
          </CardContent>

          <CardFooter className="flex justify-between mt-auto">
            <Link href={`/reviews/${review.slug}`}>
              <Button variant="outline" size="sm">
                Читать дальше
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
