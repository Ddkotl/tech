import { PostEntity } from "@/entities/post";
import { UserEntity } from "@/entities/user";

export type LikeId = string;
export type LikeEntity = {
  id: LikeId;

  user: UserEntity;
  userId: string;

  post: PostEntity;
  postId: string;
};
