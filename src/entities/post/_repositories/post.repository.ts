import { dataBase } from "@/shared/lib/db_conect";
import { Post } from "@prisma/client";

export class PostRepository {
  async getAllPosts(): Promise<Partial<Post>[]> {
    try {
      return await dataBase.post.findMany();
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }

  async getSomePosts(number: number): Promise<Partial<Post>[]> {
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

  async getPostById(postId: string): Promise<Post> {
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
  async createPost(data: Post): Promise<Post> {
    try {
      return await dataBase.post.create({
        data: data,
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }
  async updatePost(postId: string, data: Post): Promise<Post> {
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
  async deletePost(postId: string): Promise<string> {
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
