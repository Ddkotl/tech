"use client";
import { useQuery } from "@tanstack/react-query";
import { TagBage, TagBageSkeleton } from "./tag_bage";
import { getPopularTags } from "../_actions/get_popular_tags";
import { Title } from "@/shared/components";

export function PopularTags({ count }: { count: number }): JSX.Element {
  const {
    data: tags,
    isLoading,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["popular_tags", count],
    queryFn: () => getPopularTags(count),
  });
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading || isFetching) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <TagBageSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <Title size="md" text="Популярные тэги" />
      <div className="flex flex-wrap gap-2   ">
        {tags?.map((tag) => <TagBage key={tag.id} slug={tag.slug} title={tag.title}></TagBage>)}
      </div>
    </div>
  );
}
