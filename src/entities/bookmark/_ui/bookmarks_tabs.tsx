"use client";
import { RootState } from "@/app/store";
import { NewsList } from "@/entities/news";
import {
  selectIsNewsBookmarksStateInit,
  selectNewsBookmarkIds,
} from "@/features/bookmarks/slices/news_bookmarks_slice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components";
import { useSelector } from "react-redux";

export function BookmarksTabs() {
  const newsBookmarksIds = useSelector((state: RootState) => {
    return selectNewsBookmarkIds(state);
  });
  const isNewsBookmarksStateInit = useSelector((state: RootState) => {
    return selectIsNewsBookmarksStateInit(state);
  });
  return (
    <Tabs defaultValue="news">
      <TabsList>
        <TabsTrigger value="news">{`Новости`}</TabsTrigger>
        <TabsTrigger value="reviews">{`Обзоры`}</TabsTrigger>
      </TabsList>
      <TabsContent value="news">
        <NewsList newsIds={newsBookmarksIds} isNewsBookmarksStateInit={isNewsBookmarksStateInit} />
      </TabsContent>
      <TabsContent value="reviews">{/* <ReviewsList /> */}</TabsContent>
    </Tabs>
  );
}
