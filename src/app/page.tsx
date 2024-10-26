import { CreatePostForm } from "@/features/post-list/pub/create-post-form";
import { PostsList } from "@/features/post-list/pub/posts-list";

export default async function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-6">
      <h1>Posts111111</h1>
      <CreatePostForm revalidatePagePath="/" className="max-w-[300px] mb-12" />
      <PostsList revalidatePagePath="/" />
    </main>
  );
}
