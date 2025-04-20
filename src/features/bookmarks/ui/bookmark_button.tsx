"use client";
import { RootState } from "@/app/store";
import { selectIsNewsBookmarked, toggleNewsBookmark } from "@/features/bookmarks/slices/news_bookmarks_slice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/shared/components/ui/button";
import { FaBookmark } from "react-icons/fa";
import { useAppSession } from "@/entities/user/session";
import { toggleNewsBookmarkAction } from "@/entities/bookmark/_actions/toogle_news_bookmark";

export function BookmarksButton({ id, type = "news" }: { id: string; type: "news" | "reviews" }) {
  const session = useAppSession();
  const userId = session.data?.user.id;
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state: RootState) => {
    return type === "news" ? selectIsNewsBookmarked(state, id) : selectIsNewsBookmarked(state, id);
  });
  const handleClick = () => {
    if (type === "news") {
      if (userId) {
        toggleNewsBookmarkAction(userId, id);
      }
      dispatch(toggleNewsBookmark(id));
    }
  };

  return (
    <Button
      onClick={handleClick}
      aria-label={isBookmarked ? "Удалить из закладок" : "Добавить в закладки"}
      variant="ghost"
      size="icon"
      name="закладка"
    >
      <FaBookmark className={`text-fio h-4 w-4 ${isBookmarked ? " text-yellow-500" : "text-fio/80"}`} />
    </Button>
  );
}
