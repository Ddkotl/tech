"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPhoneModelsListToInfinityScroll } from "../_actions/get_models_to_infinity_scroll";
import { useEffect } from "react";
import { PhoneModelCard, PhoneModelCardSkeleton } from "./phone_model_card";
import { Title } from "@/shared/components";

export function PhoneModelsList({ brandSlug, searchTerm }: { brandSlug: string; searchTerm?: string }) {
  const perPage = 36;
  const { ref, inView } = useInView();
  const {
    data: phoneModelP,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["phone_models", brandSlug, searchTerm],
    queryFn: (pageParam) => getPhoneModelsListToInfinityScroll(brandSlug, pageParam.pageParam, perPage, searchTerm),
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr ">
        {Array.from({ length: perPage }).map((_, i) => (
          <PhoneModelCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
      {phoneModelP?.pages.length && phoneModelP.pages.some((page) => page.length) ? (
        phoneModelP?.pages.map((models) => {
          return models.map((model, index) => {
            return (
              <PhoneModelCard key={model.id} model={model} innerRef={models.length === index + 1 ? ref : undefined} />
            );
          });
        })
      ) : (
        <Title size="md" text="Ничего не найдено" />
      )}
      {isFetchingNextPage && Array.from({ length: perPage }).map((_, i) => <PhoneModelCardSkeleton key={i} />)}
    </div>
  );
}
