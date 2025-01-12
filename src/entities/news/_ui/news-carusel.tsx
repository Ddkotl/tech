"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components";
import * as React from "react";
import NewsCard from "./news-card";
import { NewsWithTags } from "../_domain/types";

export function NewsCarousel({ news }: { news: NewsWithTags[] }) {
  return (
    <section className="px-6">
      <Carousel className="w-full">
        <CarouselContent>
          {news.map((newsItem) => (
            <CarouselItem
              key={newsItem.id}
              className=" basis-full sm:basis-9/12 md:basis-6/12 lg:basis-3/12"
            >
              <NewsCard news={newsItem} prioryty={true} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
