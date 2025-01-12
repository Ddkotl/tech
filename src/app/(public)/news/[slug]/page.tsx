import { increaseNewsViewsCountAction } from "@/entities/news/_actons/increase_news_views_count_action";

export default async function SinleNewsPage({
  params,
}: {
  params: { slug: string };
}) {
  const encreasedViewsCount = await increaseNewsViewsCountAction(params.slug);
  return (
    <div>
      <h1>Single News Page</h1>
      <p>Slug: {params.slug}</p>
      <div>Views:{encreasedViewsCount}</div>
    </div>
  );
}
