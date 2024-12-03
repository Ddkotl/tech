import { dataBase } from "@/shared/lib/db_conect";
import { CreatePostDto, PostEntity, PostId } from "../_domain/types";

export class PostRepository {
  async getAllPosts(): Promise<Partial<PostEntity>[]> {
    try {
      return await dataBase.post.findMany();
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }

  async getSomePosts(number: number): Promise<Partial<PostEntity>[]> {
    try {
      return await dataBase.post.findMany({
        take: number,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
        
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }

  async getPostById(postId: PostId): Promise<Partial<PostEntity>> {
    try {
      return await dataBase.post.findUniqueOrThrow({
        where: {
          id: postId,
        },
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }
  async createPost(data: CreatePostDto): Promise<Partial<PostEntity>> {
    try {
      return await dataBase.post.create({
        data: data,
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }
  async updatePost(
    postId: PostId,
    data: CreatePostDto,
  ): Promise<Partial<PostEntity>> {
    try {
      return await dataBase.post.update({
        where: { id: postId },
        data: {
          ...data,
        },
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }
  async deletePost(postId: PostId): Promise<PostId> {
    try {
      await dataBase.post.delete({
        where: { id: postId },
      });
      return postId;
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }
}

export const postRepository = new PostRepository();
