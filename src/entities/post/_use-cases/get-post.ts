import { PostEntity, PostId } from "../_domain/types";
import { postRepository } from "../_repositories/post.repository";

export class GetPostUseCase {
  async exec(postId: PostId): Promise<PostEntity> {
    return await postRepository.getPostById(postId);
  }
}
export const getPostUseCase = new GetPostUseCase();
