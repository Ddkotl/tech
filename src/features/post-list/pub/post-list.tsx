import { revalidatePath } from "next/cache";
import { postsRepository } from "../post.repository";
import { PostItem } from "../ui/post-item";

export async function PostList({
  revalidatePagePath,
}: {
  revalidatePagePath: string;
}) {
  const postsList = await postsRepository.getPostsList();

  const hanldeDeleteAction = async (postId: string) => {
    "use server";

    await postsRepository.deletePostElement({ id: postId });
    revalidatePath(revalidatePagePath);
  };

  return (
    <div className="flex flex-col gap-3">
      {postsList.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onDelete={hanldeDeleteAction.bind(null, post.id)}
        />
      ))}
    </div>
  );
}
