import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components";
import { FeaturedPost } from "@/widgets/featured-post/featured-post";
import { RecentPosts } from "@/widgets/resent-posts/resent-posts";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать в наш блог</h1>
        <p className="text-xl text-muted-foreground">
          Откройте для себя полезные статьи, мнения экспертов и последние
          тенденции.
        </p>
      </section>

      <Suspense fallback={<div>Загрузка последнего поста...</div>}>
        <FeaturedPost />
      </Suspense>

      <Tabs defaultValue="recent" className="mb-12">
        <TabsList>
          <TabsTrigger value="recent">Последние посты</TabsTrigger>
          <TabsTrigger value="popular">Популярные посты</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <Suspense fallback={<div>Загрузка последних постов ...</div>}>
            <RecentPosts />
          </Suspense>
        </TabsContent>
        <TabsContent value="popular">
          <Suspense fallback={<div>Загрузка популярных постов...</div>}>
            {/* <PopularPosts /> */}
          </Suspense>
        </TabsContent>
      </Tabs>

      <Suspense fallback={<div>Загрузка популярных категорий...</div>}>
        {/* <PopularCategories /> */}
      </Suspense>
    </div>
  );
}
