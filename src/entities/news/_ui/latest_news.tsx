"use client";

import { useQuery } from "@tanstack/react-query";
import { MiniNewsCard } from "@/entities/news/_ui/mini-news-card";
import { getLatestNews } from "../_actons/get_latest_news";
import { PartialNews } from "../_domain/types";

export function LatestNews({ count }: { count: number }) {
  const {
    data: latestNews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestNews", count],
    queryFn: () => getLatestNews(count),
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки новостей.</p>;

  return (
    <section className="flex overflow-x-auto gap-2 lg:gap-4">
      {latestNews.map((singleNews: PartialNews) => (
        <MiniNewsCard
          key={singleNews.id}
          title={singleNews.title}
          previewImage={singleNews.previewImage}
          slug={singleNews.slug}
        />
      ))}
    </section>
  );
}
