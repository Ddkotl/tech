"use client";
import { RootState } from "@/app/store";
import { selectIsNewsBookmarked, toggleNewsBookmark } from "@/features/bookmarks/slices/news_bookmarks_slice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/shared/components/ui/button";
import { FaBookmark } from "react-icons/fa";
import { selectIsReviewsBookmarked, toggleReviewsBookmark } from "../slices/reviwes_bookmarks_slice";

export function BookmarksButton({ id, type }: { id: string; type: "news" | "reviews" }) {
  // const session = useAppSession();
  // const userId = session.data?.user.id;
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state: RootState) => {
    return type === "news" ? selectIsNewsBookmarked(state, id) : selectIsReviewsBookmarked(state, id);
  });
  const handleClick = () => {
    if (type === "news") {
      dispatch(toggleNewsBookmark(id));
      // if (userId) {
      //   toggleNewsBookmarkAction(userId, id);
      // }
    }
    if (type === "reviews") {
      dispatch(toggleReviewsBookmark(id));
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
