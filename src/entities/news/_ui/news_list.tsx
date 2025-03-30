"use client";
import { useInView } from "react-intersection-observer";
import { NewsCardForList, NewsCardForListSkeleton } from "./news_card_for_list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNewsToInfinitiScroll } from "../_actons/get_news_to_infiniti_scroll";
import { useEffect } from "react";
import { PartialNewsWithTags } from "../_domain/types";
import { Title } from "@/shared/components";

export function NewsList({ tagSlug, searchTerm }: { tagSlug?: string; searchTerm?: string }) {
  const perPage = 9;
  const { ref, inView } = useInView();
  const {
    data: newsP,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["news", tagSlug ? tagSlug : "", searchTerm ? searchTerm : ""],
    queryFn: (pageParam) => getNewsToInfinitiScroll(pageParam.pageParam, perPage, searchTerm, tagSlug),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length === perPage ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xs1:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 justify-items-center ">
        {Array.from({ length: perPage }).map((_, i) => (
          <NewsCardForListSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-1 xs1:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 justify-items-center ">
      {newsP?.pages.length && newsP.pages.some((page) => page.length) ? (
        newsP?.pages.flatMap((news: PartialNewsWithTags[]) => {
          return news.map((singleNews, index) => {
            return (
              <div key={singleNews.id}>
                <NewsCardForList SingleNew={singleNews} innerRef={news.length === index + 1 ? ref : undefined} />
              </div>
            );
          });
        })
      ) : (
        <Title size="md" text="Ничего не найдено" />
      )}
      {isFetchingNextPage && Array.from({ length: perPage }).map((_, i) => <NewsCardForListSkeleton key={i} />)}
    </div>
  );
}
