import { dataBase } from "@/shared/lib/db_conect";
import { Post } from "@prisma/client";
import { PostWithCategory } from "../_domain/types";

export class PostRepository {
  async getPaginatedPosts(
    page: number,
    pageSize: number,
  ): Promise<PostWithCategory[]> {
    try {
      return await dataBase.post.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }

  async getPostsCount(): Promise<number> {
    try {
      return await dataBase.post.count();
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }
  async getPostLikesCount(postId: string): Promise<number> {
    return await dataBase.like.count({
      where: {
        postId: postId,
      },
    });
  }
  async getPostBookmarkCount(postId: string): Promise<number> {
    return await dataBase.like.count({
      where: {
        postId: postId,
      },
    });
  }

  async getPostsByCategory(categoryId: string): Promise<PostWithCategory[]> {
    try {
      return await dataBase.post.findMany({
        where: {
          categoryId: categoryId,
        },
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }

  async getAllPosts(): Promise<PostWithCategory[]> {
    try {
      return await dataBase.post.findMany({
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }

  async getSomePosts(number: number): Promise<PostWithCategory[]> {
    try {
      return await dataBase.post.findMany({
        take: number,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new Error(`You have some error: ${error}`);
    }
  }

  async getPostById(postId: string): Promise<PostWithCategory> {
    try {
      return await dataBase.post.findUniqueOrThrow({
        where: {
          id: postId,
        },
        include: {
          category: true,
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
