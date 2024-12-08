"use client";

import { useState, useTransition } from "react";

import { Bookmark } from "lucide-react";
import { Button } from "@/shared/components";
import { toggleBookmark } from "./post.actions";

export default function BookmarkButton({
  postId,
  initialIsBookmarked,
}: {
  postId: string;
  initialIsBookmarked: boolean;
}) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isPending, startTransition] = useTransition();

  const handleBookmark = () => {
    startTransition(async () => {
      const result = await toggleBookmark(postId);
      if (result.success) {
        setIsBookmarked(!isBookmarked);
      } else {
        console.error("Failed to toggle bookmark:", result.error);
      }
    });
  };

  return (
    <Button
      variant={isBookmarked ? "default" : "outline"}
      size="sm"
      onClick={handleBookmark}
      disabled={isPending}
    >
      <Bookmark className="mr-1 h-4 w-4" />
      {isBookmarked ? "В закладах" : "В закладки"}
    </Button>
  );
}
