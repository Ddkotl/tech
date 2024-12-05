"use client";

import { useState } from "react";

import { Heart } from "lucide-react";
import { Button } from "@/shared/components";

export default function LikeButton({ postId }: { postId: string }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });
      if (response.ok) {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="sm"
      onClick={handleLike}
    >
      <Heart className="mr-2 h-4 w-4" />
      {isLiked ? "Liked" : "Like"}
    </Button>
  );
}
