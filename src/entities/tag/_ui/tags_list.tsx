"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "../_actions/get_all_tags";
import { TagCard } from "./tag_card";
import { Card, CardContent, CardHeader, Skeleton } from "@/shared/components";

export function TagsList() {
  const {
    data: tags,
    error,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getAllTags(),
  });
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading || isFetching) {
    // Отображаем скелетоны
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
        {Array.from({ length: 20 }).map((_, i) => (
          <Card
            key={i} // Добавляем уникальный ключ для каждого элемента
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
      {tags?.map((tag) => (
        <TagCard
          key={tag.id}
          tagSlug={tag.slug}
          tagTitle={tag.title}
          newsCount={tag._count.news}
          reviewsCount={tag._count.reviews}
        />
      ))}
    </div>
  );
}
