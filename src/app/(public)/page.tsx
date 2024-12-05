import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components";
import { dataBase } from "@/shared/lib/db_conect";
import Link from "next/link";

export default async function Home() {
  const recentPosts = await dataBase.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 9,
    include: { category: true },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Blog</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.category?.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.content.substring(0, 100)}...</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/posts/${post.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/posts">View All Posts</Link>
        </Button>
      </div>
    </div>
  );
}
