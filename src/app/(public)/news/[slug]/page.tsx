import { DeleteNewsButton } from "@/entities/news";
import { getSingleNewsBySlug } from "@/entities/news/_actons/get_news_by_slug";
import { increaseNewsViewsCountAction } from "@/entities/news/_actons/increase_news_views_count_action";
import { SimilarNews } from "@/entities/news/_ui/similar-news";
import { Card, CardContent, CardHeader, TimeAgo, Title } from "@/shared/components";
import { ImageGalleryComponent } from "@/shared/components/custom/image-galery-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const news = await getSingleNewsBySlug(params.slug);
  if (!news) notFound();

  const description = news.meta_description || "Получите последние обзоры смартфонов и новости технологий.";
  const imageUrl = news.previewImage || "/logo_opengraf.jpg";
  const url = `https://tech24view.ru/news/${params.slug}`;

  return {
    title: news.meta_title,
    description,
    keywords: [
      ...news.tags.map((tag) => tag.title).filter(Boolean),
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

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const news = await getSingleNewsBySlug(params.slug);
  if (!news) notFound();

  await increaseNewsViewsCountAction(params.slug);

  return (
    <main className="flex flex-col flex-1 gap-2 md:gap-4">
      <Card className="w-full mx-auto p-2">
        <CardHeader className="p-2">
          <DeleteNewsButton slug={params.slug} />
          <h1 className="lg:text-xl text-base lg:font-bold font-semibold">{news.title}</h1>
          <div className="md:text-base text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center text-foreground/80">
            <span>
              <TimeAgo date={news.createdAt} />
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          {news.previewImage && (
            <ImageGalleryComponent
              imagePaths={[news.previewImage, ...(news.images || []).filter((img) => typeof img === "string")]}
            />
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: news.content }} />
        </CardContent>
      </Card>
      <div className="flex flex-row gap-4  justify-between items-center ">
        <Title size="lg" text="Похожие новости" />
      </div>
      <SimilarNews slug={params.slug} />
    </main>
  );
}
