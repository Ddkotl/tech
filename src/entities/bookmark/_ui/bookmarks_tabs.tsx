"use client";
import { RootState } from "@/app/store";
import { NewsList } from "@/entities/news";
import { ReviewsList } from "@/entities/reviews";
import {
  selectIsNewsBookmarksStateInit,
  selectNewsBookmarkIds,
} from "@/features/bookmarks/slices/news_bookmarks_slice";
import {
  selectIsReviewsBookmarksStateInit,
  selectReviewsBookmarkIds,
} from "@/features/bookmarks/slices/reviwes_bookmarks_slice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components";
import { useSelector } from "react-redux";

export function BookmarksTabs() {
  const newsBookmarksIds = useSelector((state: RootState) => {
    return selectNewsBookmarkIds(state);
  });
  const reviewsBookmarksIds = useSelector((state: RootState) => {
    return selectReviewsBookmarkIds(state);
  });
  const isNewsBookmarksStateInit = useSelector((state: RootState) => {
    return selectIsNewsBookmarksStateInit(state);
  });
  const isReviewsBookmarksInit = useSelector((state: RootState) => {
    return selectIsReviewsBookmarksStateInit(state);
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
      <TabsContent value="reviews">
        <ReviewsList reviewsIds={reviewsBookmarksIds} isReviewsBookmarksStateInit={isReviewsBookmarksInit} />
      </TabsContent>
    </Tabs>
  );
}
