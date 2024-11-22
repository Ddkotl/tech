import { AuthorizationError } from "@/shared/lib/errors";
import { CreatePostDto, PostEntity, PostId } from "../_domain/types";
import { SessionEntity } from "@/entities/user/user";
import { createPostAbility } from "../_domain/post-ability";
import { postRepository } from "../_repositories/user.repository";

type UpdatePost = {
  postId: PostId;
  data: CreatePostDto;
  session: SessionEntity;
};

export class UpdateProfileUseCase {
  async exec({ postId, data, session }: UpdatePost): Promise<PostEntity> {
    const postAbility = createPostAbility(session);
    if (!postAbility.canUpdatePost()) {
      throw new AuthorizationError();
    }
    return await postRepository.updatePost(postId, data);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase();
