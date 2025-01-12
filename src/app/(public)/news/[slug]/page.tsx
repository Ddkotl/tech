import { getSingleNewsBySlug } from "@/entities/news/_actons/get_unic_news_acton";
import { increaseNewsViewsCountAction } from "@/entities/news/_actons/increase_news_views_count_action";
import NewsStats from "@/entities/news/_ui/news-stat";
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  TimeAgo,
} from "@/shared/components";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const news = await getSingleNewsBySlug(params.slug);
  if (!news) {
    notFound();
  }
  return {
    title: news.meta_title,
    description:
      news.meta_description ||
      "Получите последние обзоры смартфонов и новости технологий.", // Описание новости
    keywords: [
      news.tags.join(",") || "",
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
      description:
        news.meta_description ||
        "Получите последние обзоры смартфонов и новости технологий.",
      images: [
        {
          url: news.previewImage || "/logo_opengraf.jpg",
        },
      ],
      url: `https://tech24view.ru/news/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image", // Для Twitter используется карточка с большим изображением
      title: news.meta_title,
      description:
        news.meta_description ||
        "Получите последние обзоры смартфонов и новости технологий.",
      images: [news.previewImage || "/logo_opengraf.jpg"], // Изображение для Twitter
    },
    alternates: {
      canonical: `https://tech24view.ru/news/${params.slug}`,
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

  // Increment views
  await increaseNewsViewsCountAction(params.slug);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h1 className="text-3xl font-bold">{news.title}</h1>
        <p className="text-sm text-gray-500">
          Published on {news.createdAt.toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        {news.previewImage && (
          <div className="mb-4">
            <Image
              src={news.previewImage}
              alt={news.title}
              width={800}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-center gap-1 h-[60px] overflow-hidden ">
            {news.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="text-sm h-7 truncate px-2"
              >
                {tag.title}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-col gap-4 text-sm text-foreground/50 w-full px-2">
          <NewsStats slug={news.slug} bookmarks={33} likes={4} />
          <div className="flex justify-between">
            Добавлено: <TimeAgo date={news.createdAt} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
