"use client";

import { useState } from "react";

import { Bookmark } from "lucide-react";
import { Button } from "@/shared/components";

export default function BookmarkButton({ postId }: { postId: string }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/bookmark`, {
        method: "POST",
      });
      if (response.ok) {
        setIsBookmarked(!isBookmarked);
      }
    } catch (error) {
      console.error("Failed to bookmark post:", error);
    }
  };

  return (
    <Button
      variant={isBookmarked ? "default" : "outline"}
      size="sm"
      onClick={handleBookmark}
    >
      <Bookmark className="mr-2 h-4 w-4" />
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  );
}
