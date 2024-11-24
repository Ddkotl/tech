import { dataBase } from "@/shared/lib/db_conect";
import { CreatePostDto, PostEntity, PostId } from "../_domain/types";

export class PostRepository {
  async getAllPosts(): Promise<PostEntity[]> {
    return await dataBase.post.findMany();
  }

  async getPostById(postId: PostId): Promise<PostEntity> {
    return await dataBase.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
    });
  }
  async createPost(data: CreatePostDto): Promise<PostEntity> {
    return await dataBase.post.create({
      data: data,
    });
  }
  async updatePost(postId: PostId, data: CreatePostDto): Promise<PostEntity> {
    return await dataBase.post.update({
      where: { id: postId },
      data: {
        ...data,
      },
    });
  }
  async deletePost(postId: PostId): Promise<PostId> {
    await dataBase.post.delete({
      where: { id: postId },
    });
    return postId;
  }
}

export const postRepository = new PostRepository();
