import { PostEntity } from "../_domain/types";
import { postRepository } from "../_repositories/post.repository";

export class GetAllPostsUseCase {
  async exec(): Promise<PostEntity[]> {
    return await postRepository.getAllPosts();
  }
}
export const getAllPostsUseCase = new GetAllPostsUseCase();
