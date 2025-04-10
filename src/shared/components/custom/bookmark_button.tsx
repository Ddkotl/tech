"use client";
import { RootState } from "@/app/store";
import { selectIsNewsBookmarked, toggleNewsBookmark } from "@/features/bookmarks/news/news_bookmarks_slice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { FaRegBookmark } from "react-icons/fa";

export function BookmarksButton({ id, type = "news" }: { id: string; type: "news" | "reviews" }) {
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state: RootState) => {
    return type === "news" ? selectIsNewsBookmarked(state, id) : selectIsNewsBookmarked(state, id);
  });
  const handleClick = () => {
    dispatch(type === "news" ? toggleNewsBookmark(id) : toggleNewsBookmark(id));
  };

  return (
    <Button
      onClick={handleClick}
      aria-label={isBookmarked ? "Удалить из закладок" : "Добавить в закладки"}
      variant="ghost"
      size="icon"
      name="закладка"
    >
      <FaRegBookmark className={`text-fio h-4 w-4 ${isBookmarked ? " text-yellow-500" : "text-fio"}`} />
    </Button>
  );
}
