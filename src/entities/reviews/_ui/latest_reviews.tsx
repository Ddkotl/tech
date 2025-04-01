"use client";

import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components";
import Autoplay from "embla-carousel-autoplay";
import { getLatestReviews } from "../_actions/get_latest_reviews";
import { PartialReviews } from "../_domain/types";
import { MiniReviewsCard, SceletonMiniReviewsCard } from "./mini-reviews-card";

export function LatestReviews({ count }: { count: number }) {
  const {
    data: latestReviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestReviews", count],
    queryFn: () => getLatestReviews({ count: count }),
  });

  if (isError) return <p>Ошибка загрузки обзоров.</p>;
  if (latestReviews && latestReviews.length === 0) return <p>Нет обзоров</p>;
  return (
    <section className="flex justify-center flex-shrink ">
      <div className="flex max-w-[80%] md:max-w-[400px] md1:max-w-[450px] md2:max-w-[500px] lg:max-w-[600px] xl:max-w-[750px] gap-2 lg:gap-4">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            {isLoading
              ? Array.from({ length: count }).map((_, index) => (
                  <CarouselItem className="basis-1/8" key={index}>
                    <SceletonMiniReviewsCard />
                  </CarouselItem>
                ))
              : latestReviews?.map((singleReview: PartialReviews) => (
                  <CarouselItem className="basis-1/8" key={singleReview.id}>
                    <MiniReviewsCard
                      title={singleReview.title}
                      previewImage={singleReview.previewImage}
                      slug={singleReview.slug}
                    />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
