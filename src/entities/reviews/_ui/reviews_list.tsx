"use client";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getReviewsToInfinitiScroll } from "../_actions/get_reviews_to_infiniti_scroll";
import { PartialReviewsWithTags } from "../_domain/types";
import { ReviewsCardForList, ReviewsCardForListSkeleton } from "./reviews_card_for_list";
import { Title } from "@/shared/components";

export function ReviewsList({ tagSlug, searchTerm }: { tagSlug?: string; searchTerm?: string }) {
  const perPage = 9;
  const { ref, inView } = useInView();
  const {
    data: reviewsP,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews", tagSlug ? tagSlug : "", searchTerm ? searchTerm : ""],
    queryFn: (pageParam) => getReviewsToInfinitiScroll(pageParam.pageParam, perPage, searchTerm, tagSlug),
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
          <ReviewsCardForListSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-1 xs1:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 justify-items-center ">
      {reviewsP?.pages.length && reviewsP.pages.some((page) => page.length) ? (
        reviewsP.pages.flatMap((reviews: PartialReviewsWithTags[]) =>
          reviews.map((SingleReview, index) => (
            <div key={SingleReview.id}>
              <ReviewsCardForList
                SingleReview={SingleReview}
                innerRef={reviews.length === index + 1 ? ref : undefined}
              />
            </div>
          )),
        )
      ) : (
        <Title size="md" text="Ничего не найдено" />
      )}
      {isFetchingNextPage && Array.from({ length: perPage }).map((_, i) => <ReviewsCardForListSkeleton key={i} />)}
    </div>
  );
}
