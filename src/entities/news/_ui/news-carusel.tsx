import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components";
import { News, Tag } from "@prisma/client";
import * as React from "react";
import NewsCard from "./news-card";

export type NewsWithTags = News & {
  tags: Tag[];
};
export function NewsCarousel({ news }: { news: NewsWithTags[] }) {
  return (
    <div className="px-8">
      <Carousel className="w-full">
        <CarouselContent>
          {news.map((newsItem) => (
            <CarouselItem
              key={newsItem.id}
              className=" basis-full sm:basis-9/12 md:basis-6/12 lg:basis-3/12"
            >
              <NewsCard news={newsItem} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
