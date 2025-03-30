import { Tabs, TabsContent, TabsList, TabsTrigger, Title } from "@/shared/components";
import { ReviewsList } from "@/entities/reviews";
import { NewsList } from "@/entities/news";
import { generateSEOMetadata } from "@/features/seo/generate_metadata";
import { Metadata } from "next";
import { getTagBYSlug, TagsWithCounts } from "@/entities/tag";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pageParams = await params;
  const tag: TagsWithCounts | null = await getTagBYSlug(pageParams.slug);
  return generateSEOMetadata({
    title: `Поиск по тэгу: ${tag?.title}`,
    description: `Список новостей и обзоров по тэгу ${tag?.title}`,
    keywords: [
      "тэги",
      "брэнды смартфонов",
      "технологии",
      "смартфоны",
      "обзоры",
      "новости",
      "новости смартфонов",
      "гаджеты",
      "мобильные телефоны",
      "инновации",
    ],
    ogImage: "/logo_opengraf.jpg",
    canonical: `https://tech24view.ru/tags/${tag?.slug}`,
  });
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const tag: TagsWithCounts | null = await getTagBYSlug(pageParams.slug);
  return (
    <main className="flex flex-col flex-1    gap-2 md:gap-4">
      <Title size="xl" text={`Все, найденное по тэгу: ${tag?.title}`} />
      <Tabs defaultValue="news">
        <TabsList>
          <TabsTrigger value="news">{`Новости (${tag?._count.news})`}</TabsTrigger>
          <TabsTrigger value="reviews">{`Обзоры (${tag?._count.reviews})`}</TabsTrigger>
        </TabsList>
        <TabsContent value="news">
          <NewsList tagSlug={pageParams.slug} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsList tagSlug={pageParams.slug} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
