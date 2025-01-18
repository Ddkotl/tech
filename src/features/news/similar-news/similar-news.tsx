import { MiniNewsCard } from "@/entities/news/_ui/mini-news-card";
import { News } from "@prisma/client";

interface SimilarPostsProps {
  news: News[];
}

export function SimilarNews({ news }: SimilarPostsProps) {
  return (
    <section className="py-6">
      <div className="container">
        <h2 className="text-xl font-bold mb-4">Похожие новости</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {news.map((singleNews) => (
            <MiniNewsCard
              key={singleNews.id}
              title={singleNews.title}
              previewImage={singleNews.previewImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
