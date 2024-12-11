import { getFeaturedPost } from "@/entities/post/_actions/posts.server.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components";
import { FeaturedPost } from "@/widgets/featured-post/featured-post";
import { RecentPosts } from "@/widgets/resent-posts/resent-posts";
import { Suspense } from "react";

export default async function Home() {
  const post = getFeaturedPost();
  console.log(post);
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-xl text-muted-foreground">
          Discover insightful articles, expert opinions, and the latest trends.
        </p>
      </section>

      <Suspense fallback={<div>Loading featured post...</div>}>
        <FeaturedPost />
      </Suspense>

      <Tabs defaultValue="recent" className="mb-12">
        <TabsList>
          <TabsTrigger value="recent">Recent Posts</TabsTrigger>
          <TabsTrigger value="popular">Popular Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <Suspense fallback={<div>Loading recent posts...</div>}>
            <RecentPosts />
          </Suspense>
        </TabsContent>
        <TabsContent value="popular">
          <Suspense fallback={<div>Loading popular posts...</div>}>
            {/* <PopularPosts /> */}
          </Suspense>
        </TabsContent>
      </Tabs>

      <Suspense fallback={<div>Loading popular categories...</div>}>
        {/* <PopularCategories /> */}
      </Suspense>
    </div>
  );
}
