import { MiniNewsCard } from "@/entities/news/_ui/mini-news-card";
import { News } from "@prisma/client";
import { getSimilarNews } from "../_actons/get-similar-news";

export async function SimilarNews({ slug }: { slug: string }) {
  const similarNews: News[] = await getSimilarNews(slug);

  return (
    <section className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Похожие новости</h2>
      <div className=" w-full flex overflow-x-auto gap-2 lg:gap-4 ">
        {similarNews.map((singleNews) => (
          <MiniNewsCard
            key={singleNews.id}
            title={singleNews.title}
            previewImage={singleNews.previewImage}
            slug={singleNews.slug}
          />
        ))}
      </div>
    </section>
  );
}
