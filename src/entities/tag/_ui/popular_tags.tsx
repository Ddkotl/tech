"use client";
import { useQuery } from "@tanstack/react-query";
import { TagBage, TagBageSkeleton } from "./tag_bage";
import { getPopularTags } from "../_actions/get_popular_tags";
import { Button, Title } from "@/shared/components";
import Link from "next/link";

export function PopularTags({ count }: { count: number }): JSX.Element {
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular_tags", count],
    queryFn: () => getPopularTags(count),
  });
  if (isError) {
    return <div>Ошибка загрузки популярных тэгов </div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <Title size="md" text="Популярные тэги" />
      <div className="flex flex-wrap gap-2   ">
        {isLoading
          ? Array.from({ length: count }).map((_, i) => <TagBageSkeleton key={i} />)
          : tags?.map((tag) => <TagBage key={tag.id} slug={tag.slug} title={tag.title}></TagBage>)}
        {!isLoading && (
          <Link href={"/tags"}>
            <Button variant="outline" className="px-1.5 py-0.5 h-6 w-16 text-xs font-medium">
              все тэги
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
