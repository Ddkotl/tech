import { getSingleNewsBySlug } from "@/entities/news/_actons/get_unic_news_acton";
import { increaseNewsViewsCountAction } from "@/entities/news/_actons/increase_news_views_count_action";
import { getSimilarNews } from "@/features/news/similar-news/_actions/get-similar-news";
import { SimilarNews } from "@/features/news/similar-news/similar-news";
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ImageGallery,
  TimeAgo,
} from "@/shared/components";

import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaBookmark, FaEye } from "react-icons/fa";
import styles from "./content.module.css";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const news = await getSingleNewsBySlug(params.slug);
  if (!news) {
    notFound();
  }

  const description =
    news.meta_description ||
    "Получите последние обзоры смартфонов и новости технологий.";
  const imageUrl = news.previewImage || "/logo_opengraf.jpg";
  const url = `https://tech24view.ru/news/${params.slug}`;

  return {
    title: news.meta_title,
    description,
    keywords: [
      ...(news.tags ? news.tags.map((tag) => tag.title) : []),
      "технологии",
      "смартфоны",
      "обзоры",
      "новости",
      "новости смартфонов",
      "гаджеты",
      "мобильные телефоны",
      "инновации",
    ],
    openGraph: {
      title: news.meta_title,
      description,
      images: [{ url: imageUrl }],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: news.meta_title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: { slug: string };
}) {
  const news = await getSingleNewsBySlug(params.slug);

  if (!news) notFound();
  const similarNews = await getSimilarNews(params.slug);
  await increaseNewsViewsCountAction(params.slug);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">{news.title}</h1>
        <div className="text-md flex flex-col sm:flex-row justify-between items-start sm:items-center text-foreground/80">
          <div>
            Опубликовано: <TimeAgo date={news.createdAt} />
          </div>
          <div className="flex gap-4 sm:gap-10 mt-2 sm:mt-0">
            <div className="flex items-center space-x-2">
              <FaEye className="text-blue-500" aria-hidden="true" />
              <span>{news.views} просмотров</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBookmark className="text-yellow-500" aria-hidden="true" />
              <span>{news.bookmarksCount} закладок</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {news.previewImage && (
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Image
              src={news.previewImage || "/placeholder.png"}
              alt={news.title}
              priority
              width={400}
              height={200}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-lg object-contain"
            />
            <div className="mt-2 md:mt-0">
              <div className="flex flex-wrap items-center justify-start gap-1 overflow-hidden">
                {news.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="text-sm h-7 px-2 items-start"
                  >
                    {tag.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
        <ImageGallery images={news.images} />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <SimilarNews news={similarNews} />
      </CardFooter>
    </Card>
  );
}
