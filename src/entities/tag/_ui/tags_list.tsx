"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TagCard } from "./tag_card";
import { Card, CardContent, CardHeader, Skeleton } from "@/shared/components";
import { useCallback, useEffect, useState } from "react";
import { getAllTagsWithPagination } from "../_actions/get_all_tags_with_pagination";

export function TagsList() {
  const perPage = 100;
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const {
    data: tags,
    error,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getAllTagsWithPagination(page, perPage),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (tags && tags.length < perPage) {
      setHasNextPage(false);
    }
  }, [tags]);
  // Функция для отслеживания прокрутки
  const loadMore = useCallback(
    (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && hasNextPage && !isFetching) {
        setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы для подгрузки данных
      }
    },
    [hasNextPage, isFetching],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newObserver = new IntersectionObserver(([entry]) => loadMore(entry), {
        rootMargin: "200px", // Начинаем загружать данные, когда остается 200px до конца
      });
      setObserver(newObserver);
    }
  }, [loadMore]);

  // Создаем реф для отслеживания элемента
  const lastTagRef = (node: HTMLElement | null) => {
    if (node && observer) {
      observer.observe(node); // Начинаем отслеживать последний элемент
    }
  };
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
        {Array.from({ length: 24 }).map((_, i) => (
          <Card
            key={i}
            className="p-0 h-24 flex flex-col justify-evenly shadow-md transition-all duration-300 hover:scale-95 hover:shadow-lg hover:bg-foreground/10 items-center"
          >
            <CardHeader className="p-1 flex items-center justify-center text-center">
              <Skeleton className="w-24 h-4 rounded-md" />
            </CardHeader>
            <CardContent className="flex flex-col p-1 items-center justify-center gap-1">
              <Skeleton className="w-24 h-3 rounded-md" />
              <Skeleton className="w-20 h-3 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
      {tags?.map((tag, index) => (
        <div ref={index === tags.length - 1 ? lastTagRef : null} key={tag.id}>
          <TagCard
            tagSlug={tag.slug}
            tagTitle={tag.title}
            newsCount={tag._count.news}
            reviewsCount={tag._count.reviews}
          />
        </div>
      ))}
    </div>
  );
}
