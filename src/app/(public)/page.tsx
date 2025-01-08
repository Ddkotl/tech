import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { dataBase } from "@/shared/lib/db_conect";
import { generateMetadata } from "@/features/seo/generate_metadata";
import { Button, Separator } from "@/shared/components";
import NewsCard from "@/widgets/news_card";
import PopularTags from "@/widgets/popular_tag";

const getLatestContent = unstable_cache(
  async () => {
    const [news, reviews, popularTags] = await Promise.all([
      dataBase.news.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          tags: true,
          _count: {
            select: { likes: true, bookmarks: true },
          },
        },
      }),
      dataBase.reviews.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          tags: true,
          _count: {
            select: { likes: true, bookmarks: true },
          },
        },
      }),
      dataBase.tag.findMany({
        take: 10,
      }),
    ]);

    return { news, reviews, popularTags };
  },
  [],
  { revalidate: 2 * 60 * 60 },
);

export const metadata: Metadata = generateMetadata({
  title: "Tech News - Latest Technology News and Reviews",
  description:
    "Stay updated with the latest technology news and reviews from Tech News.",
  keywords: ["tech news", "technology", "reviews", "gadgets"],
  ogImage: "/og-image.jpg",
  canonical: "https://your-domain.com",
});

export default async function Home() {
  const { news, reviews, popularTags } = await getLatestContent();
  console.log(popularTags);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Tech News</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <main className="flex-grow">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Latest News</h2>
                <Link href="/news">
                  <Button variant="link">View all news</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {news.map((item) => (
                  <Suspense key={item.id} fallback={<div>Loading...</div>}>
                    <NewsCard news={item} />
                  </Suspense>
                ))}
              </div>
            </section>
            <Separator className="my-8" />
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Latest Reviews</h2>
                <Link href="/reviews">
                  <Button variant="link">View all reviews</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {/* {reviews.map((item) => (
                  <Suspense key={item.id} fallback={<div>Loading...</div>}>
                    <ReviewCard review={item} />
                  </Suspense>
                ))} */}
              </div>
            </section>
          </main>
          <aside className="w-full md:w-64">
            <PopularTags tags={popularTags} />
          </aside>
        </div>
      </div>
    </>
  );
}
