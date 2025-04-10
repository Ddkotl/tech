"use client";
import { FaRegBookmark } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { selectNewsBookmarksCount } from "@/features/bookmarks/news/news_bookmarks_slice";

export function BookmarksIcon() {
  const newsCount = useSelector((state: RootState) => {
    return selectNewsBookmarksCount(state);
  });
  return (
    <Link href={`/bookmarks`}>
      <Button variant="ghost" size="icon" name="закладки" aria-label="закладки" className="relative">
        <FaRegBookmark className=" text-fio h-4 w-4" />
        {newsCount < 100 ? (
          <span className="absolute -top-2 -right-1  bg-fio text-white text-xs font-bold rounded-full h-4 p-1 flex items-center justify-center">
            {newsCount}
          </span>
        ) : (
          <span className="absolute -top-2 -right-1 bg-fio text-white text-xs font-bold rounded-full h-4  flex items-center justify-center">
            99+
          </span>
        )}
      </Button>
    </Link>
  );
}
