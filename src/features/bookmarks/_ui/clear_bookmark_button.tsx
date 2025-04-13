"use client";
import { useDispatch } from "react-redux";
import { clearNewsBookmarks } from "../news/news_bookmarks_slice";
import { Button } from "@/shared/components";

export function CleareBookmarksButton() {
  const dispatch = useDispatch();
  const handleClearBookmarks = () => {
    dispatch(clearNewsBookmarks());
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      name="очистить закладки"
      aria-label="очистить закладки"
      onClick={handleClearBookmarks}
    >
      Очистить закладки
    </Button>
  );
}
