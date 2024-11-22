import { AuthorizationError } from "@/shared/lib/errors";
import { PostId } from "../_domain/types";
import { SessionEntity } from "@/entities/user/user";
import { createPostAbility } from "../_domain/post-ability";
import { postRepository } from "../_repositories/user.repository";

type DeletePost = {
  postId: PostId;

  session: SessionEntity;
};

export class DeleteProfileUseCase {
  async exec({ postId, session }: DeletePost): Promise<PostId> {
    const postAbility = createPostAbility(session);
    if (!postAbility.canDeletePost()) {
      throw new AuthorizationError();
    }
    return await postRepository.deletePost(postId);
  }
}

export const deleteProfileUseCase = new DeleteProfileUseCase();
