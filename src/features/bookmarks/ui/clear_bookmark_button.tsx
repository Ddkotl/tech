"use client";
import { useDispatch } from "react-redux";
import { Button } from "@/shared/components";
import { clearNewsBookmarks } from "../slices/news_bookmarks_slice";
import { deleteAllNewsBookmarksByUser } from "@/entities/bookmark/_actions/delete_news_bookmarks";
import { useAppSession } from "@/entities/user/session";

export function CleareBookmarksButton() {
  const dispatch = useDispatch();
  // const session = useAppSession();
  // const userId = session?.data?.user.id;

  const handleClearBookmarks = () => {
    // if (userId) {
      // deleteAllNewsBookmarksByUser(userId);
    // }
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
