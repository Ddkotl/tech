"use client";
import { Skeleton } from "@/shared/components";
import { NavigationButton } from "@/shared/components/custom/navigation_button";
import { getNextAndPrevModelsInfo } from "../_actions/get_next_prev_model";
import { useQuery } from "@tanstack/react-query";
import { QUERY_STALE_TIME } from "@/shared/lib/config/public";

export function NextAndPrevButtons({
  currentModelSlug,
  brandId,
}: {
  currentModelSlug: string;
  brandId: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["nextPrevModels", currentModelSlug, brandId],
    queryFn: async () =>
      await getNextAndPrevModelsInfo(currentModelSlug, brandId),
    staleTime: QUERY_STALE_TIME,
  });

  if (isLoading) {
    return (
      <div className="flex justify-between gap-2 lg:gap-4">
        <Skeleton className="h-24 w-32 rounded-md" />
        <Skeleton className="h-24 w-32 rounded-md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-foreground">
        Не удалось загрузить данные о соседних моделях.
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-2 lg:gap-4">
      {data?.next_slug ? (
        <NavigationButton
          slug={data.next_slug}
          image={data.next_main_image || ""}
          text={data.next_full_name || ""}
          direction="next"
          isLoading={isLoading}
        />
      ) : (
        <div className="flex-1" />
      )}
      {data?.prev_slug ? (
        <NavigationButton
          slug={data.prev_slug}
          image={data.prev_main_image || ""}
          text={data.prev_full_name || ""}
          direction="prev"
          isLoading={isLoading}
        />
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
