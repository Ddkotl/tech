import { MiniNewsCard } from "@/entities/news/_ui/mini-news-card";
import { getLatestNews } from "../_actons/get_latest_news";
import { PartialNews } from "../_domain/types";

export async function LatestNews({ count }: { count: number }) {
  const latestNews: PartialNews[] | [] = await getLatestNews(count);

  if (!latestNews) {
    return null;
  }
  return (
    <section className="  flex overflow-x-auto gap-2 lg:gap-4  ">
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
