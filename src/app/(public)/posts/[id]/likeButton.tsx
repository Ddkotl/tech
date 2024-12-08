"use client";

import { useState, useTransition } from "react";

import { Heart } from "lucide-react";
import { Button } from "@/shared/components";
import { toggleLike } from "./post.actions";

export default function LikeButton({
  postId,
  initialIsLiked,
}: {
  postId: string;
  initialIsLiked: boolean;
}) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      const result = await toggleLike(postId);
      if (result.success) {
        setIsLiked(!isLiked);
      } else {
        console.error("Failed to toggle like:", result.error);
      }
    });
  };

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="sm"
      onClick={handleLike}
      disabled={isPending}
    >
      <Heart className="mr-1 h-4 w-4" />
      {isLiked ? "Лайкнуто" : "Лайк"}
    </Button>
  );
}
