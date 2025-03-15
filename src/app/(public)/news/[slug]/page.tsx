import { DeleteNewsButton } from "@/entities/news";
import { getSingleNewsBySlug } from "@/entities/news/_actons/get_unic_news_acton";
import { increaseNewsViewsCountAction } from "@/entities/news/_actons/increase_news_views_count_action";
import { LastModels } from "@/entities/phone_models";
import { SimilarNews } from "@/features/news/similar-news/similar-news";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Container,
  ContentContainer,
  TimeAgo,
} from "@/shared/components";
import { ImageGalleryComponent } from "@/shared/components/custom/image-galery-react";
import { Sidebar } from "@/widgets/sidebar/app-sidebar";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const news = await getSingleNewsBySlug(params.slug);
  if (!news) notFound();

  const description =
    news.meta_description ||
    "Получите последние обзоры смартфонов и новости технологий.";
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

export default async function NewsPage({
  params,
}: {
  params: { slug: string };
}) {
  const news = await getSingleNewsBySlug(params.slug);
  if (!news) notFound();

  await increaseNewsViewsCountAction(params.slug);

  return (
    <Container className="flex gap-2  flex-1 lg:gap-6 ">
      <ContentContainer className="flex flex-col  flex-1 gap-2 lg:gap-6 ">
        <section className="flex flex-col flex-1 gap-2 md:gap-4">
          <Card className="w-full mx-auto p-2">
            <CardHeader className="p-2">
              <DeleteNewsButton slug={params.slug} />
              <h1 className="lg:text-xl text-base lg:font-bold font-semibold">
                {news.title}
              </h1>
              <div className="md:text-base text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center text-foreground/80">
                <span>
                  <TimeAgo date={news.createdAt} />
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              {news.previewImage && (
                <ImageGalleryComponent
                  imagePaths={[
                    news.previewImage,
                    ...(news.images || []).filter(
                      (img) => typeof img === "string",
                    ),
                  ]}
                />
              )}
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </CardContent>
            <CardFooter className="flex justify-between items-center p-2">
              <SimilarNews slug={params.slug} />
            </CardFooter>
          </Card>
        </section>
      </ContentContainer>
      <Sidebar children1={<LastModels />} />
    </Container>
  );
}
