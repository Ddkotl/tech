import { SessionEntity } from "@/entities/user/user";
import { CreatePostDto, PostEntity } from "../_domain/types";
import { postRepository } from "../_repositories/post.repository";
import { createPostAbility } from "../_domain/post-ability";
import { AuthorizationError } from "@/shared/lib/errors";

export class CreatePostUseCase {
  async exec({
    data,
    session,
  }: {
    data: CreatePostDto;
    session: SessionEntity;
  }): Promise<PostEntity> {
    const postAbility = createPostAbility(session);
    if (!postAbility.canCreatePost()) {
      throw new AuthorizationError();
    }
    const post = await postRepository.createPost(data);

    return post;
  }
}

export const createPostUseCase = new CreatePostUseCase();
