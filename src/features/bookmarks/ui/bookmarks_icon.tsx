"use client";
import { IoBookmarks } from "react-icons/io5";
import Link from "next/link";
import { Button } from "../../../shared/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { Skeleton } from "../../../shared/components/ui/skeleton";
import {
  initNewsBookmarks,
  selectIsNewsBookmarksStateInit,
  selectNewsBookmarksCount,
} from "../slices/news_bookmarks_slice";

export function BookmarksIcon() {
  const dispatch = useDispatch();
  const isNewsBookmarksStateInit = useSelector((state: RootState) => {
    return selectIsNewsBookmarksStateInit(state);
  });
  const newsCount = useSelector((state: RootState) => {
    return selectNewsBookmarksCount(state);
  });
  // const newsBookmarksLocal = useSelector((state: RootState) => {
  //   return selectNewsBookmarkIds(state);
  // });
  // console.log("newsBookmarksLocal", newsBookmarksLocal);
  useEffect(() => {
    dispatch(initNewsBookmarks());
  }, [dispatch]);

  if (!isNewsBookmarksStateInit) {
    return (
      <Button
        variant="ghost"
        size="icon"
        name="закладки"
        aria-label="закладки"
        className="relative cursor-auto"
        disabled
      >
        <IoBookmarks className=" text-fio h-4 w-4" />
        <Skeleton className="h-4 w-4  rounded-full  absolute -top-1 -right-1" />
      </Button>
    );
  }
  return (
    <Link href={`/bookmarks`}>
      <Button variant="ghost" size="icon" name="закладки" aria-label="закладки" className="relative">
        <IoBookmarks className=" text-fio h-4 w-4" />
        <span className="absolute -top-1 -right-1  bg-fio text-white text-xs font-bold rounded-full h-4 p-1 flex items-center justify-center">
          {newsCount < 100 ? newsCount : "99+"}
        </span>
      </Button>
    </Link>
  );
}
